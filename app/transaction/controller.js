const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.find().populate("player");
      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
        name: req.session.user.name,
        title: "Halaman Transaction",
      });
      console.log(transaction);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaction.findByIdAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", `Data berhasil diupdate`);
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
