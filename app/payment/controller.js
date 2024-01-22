const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      console.log(alert);

      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", {
        payment,
        alert,
        name: req.session.user.name,
        title: "Halaman Payment",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", {
        banks,
        name: req.session.user.name,
        title: "Halaman Add Payment",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Data successfully added");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const banks = await Bank.find();
      const payment = await Payment.findOne({ _id: id });

      res.render("admin/payment/edit", {
        payment,
        banks,
        name: req.session.user.name,
        title: "Halaman Edit Payment",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash("alertMessage", "Data successfully edited");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.deleteOne({ _id: id });

      req.flash("alertMessage", "Data successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      let status = payment.status === "Y" ? "N" : "Y";
      await Payment.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Status updated");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
