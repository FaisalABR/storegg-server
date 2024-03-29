const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      console.log(alert);

      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/view_signin", { alert });
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },

  actionSignin: async (req, res) => {
    const { email, password } = req.body;
    const check = await User.findOne({ email });

    if (check) {
      if (check.status === "Y") {
        const checkPassword = await bcrypt.compare(password, check.password);
        console.log(checkPassword);

        if (checkPassword) {
          req.session.user = {
            id: check._id,
            email: check.email,
            status: check.status,
            name: check.name,
          };
          res.redirect("/dashboard");
        } else {
          req.flash("alertMessage", `Password anda salah`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Maaf status anda belum aktif`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } else {
      req.flash("alertMessage", `Email anda salah`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
