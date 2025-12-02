const adminService = require("../services/adminServices");

class AdminQaController {
  CreateANewUser = async (req, res) => {
    let message = await adminService.createNewUser(req.body);
    return res.status(200).json(message);
  };

  getAllUsers = async (req, res) => {
    let users = await adminService.getAllUsers();
    return res.status(200).json(users);
  };

  EditUser = async (req, res) => {
    let user = await adminService.editUser(req.body);
    return res.status(200).json(user);
  };

  DeleteUser = async (req, res) => {
    await adminService.deleteUser(req.body.id);
    return res.status(200).json({ errMessage: "User deleted successfully" });
  };

  LoginUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
      return res.status(200).json({
        errMessage: "Missing email or password",
        errCode: 1,
      });
    } else {
      let a = await adminService.UserLogin(email, password);
      return res.status(200).json(a);
    }
  };
}
module.exports = new AdminQaController();
