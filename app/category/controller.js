const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      console.log(alert);

      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
        alert,
        name: req.session.user.name,
        title: "Halaman Category",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        name: req.session.user.name,
        title: "Halaman Add Category",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      req.flash("alertMessage", "Data successfully added");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        category,
        name: req.session.user.name,
        title: "Halaman Edit Category",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate({ _id: id }, { name });

      req.flash("alertMessage", "Data successfully edited");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.deleteOne({ _id: id });

      req.flash("alertMessage", "Data successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
};
