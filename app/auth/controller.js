const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const player = new Player({
              ...payload,
              avatar: filename,
            });

            await player.save();

            delete player._doc.password;

            res.status(201).json({ data: player });
          } catch (error) {
            if (error && error.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next(err);
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;

        res.status(201).json({ data: player });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        return res
          .status(422)
          .json({ error: 1, message: error.message, fields: error.errors });
      }
      next(err);
    }
  },
  signin: (req, res, next) => {
    const { email, password } = req.body;
    Player.findOne({ email: email })
      .then((player) => {
        if (player) {
          const checkPassword = bcrypt.compareSync(password, player.password);

          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  name: player.name,
                  username: player.username,
                  email: player.email,
                  phoneNumber: player.phoneNumber,
                  avatar: player.avatar,
                },
              },
              config.jwtKey
            );

            res.status(200).json({ data: { token } });
          } else {
            res
              .status(403)
              .json({ message: "Password yang anda masukkan salah" });
          }
        } else {
          res
            .status(403)
            .json({ message: "Email yang anda masukkan belum terdaftar" });
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json({ message: error.message || "Terjadi kesalahan pada server" })
      );
  },
};
