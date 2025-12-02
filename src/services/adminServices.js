const db = require("../models/index");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

let UserLogin = async (email, password) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  if (user) {
    let check = await bcrypt.compareSync(password, user.password);
    if (check == true) {
      delete user.password;
      return {
        errCode: 0,
        errMessage: "User Login Successfully",
        data: user,
      };
    } else {
      return {
        errCode: 4,
        errMessage: "User Login Failed",
      };
    }
  } else {
    return {
      errCode: 3,
      errMessage: "Account does not exist",
    };
  }
};

let createNewUser = async (data) => {
  try {
    //check if email is exist
    let check = await checkUserEmail(data.email);
    if (check === true) {
      return {
        errCode: 1,
        errMessage: "This email is already exist",
      };
    } else {
      if (
        !data.password ||
        !data.email ||
        !data.role ||
        !data.fullName ||
        !data.position
      ) {
        return {
          errCode: 1,
          errMessage: "Must input all the fields",
        };
      } else {
        let hashUserPass = await hashPasswords(data.password);
        await db.User.create({
          email: data.email,
          password: hashUserPass,
          fullName: data.fullName,
          address: data.address,
          phone: data.phone,
          role: data.role,
          position: data.position,
          image: data.image,
          gender: data.gender,
        });
        return {
          errCode: 0,
          errMessage: "Successfully",
        };
      }
    }
  } catch (e) {
    return e;
  }
};

let hashPasswords = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllUsers = async () => {
  try {
    let users = await db.User.findAll();
    if (users) {
      return {
        data: users,
        errCode: 0,
        errMessage: "Successfully",
      };
    }
  } catch (e) {
    return e;
  }
};

let editUser = async (user) => {
  try {
    let a = await db.User.findOne({
      where: { id: user.id },
      raw: false,
    });
    console.log(',,,',user)
    if (
      !user.fullName ||
      !user.phone ||
      !user.role ||
      !user.position
    ) {
      return {
        errCode: 1,
        errMessage: "Missing Input Field",
      };
    } else {
      a.email = user.email;
      a.fullName = user.fullName;
      a.address = user.address;
      a.phone = user.phone;
      a.role = user.role;
      a.image = user.image;
      a.position = user.position;
      await a.save();
      return {
        errCode: 0,
        errMessage: "Edit user successfully",
      };
    }
  } catch (e) {
    return e;
  }
};

let deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await db.User.destroy({
        where: { id: id },
      });
      return {
        errMessage: "User deleted successfully",
        errCode: 0,
      };
    }
  } catch (e) {
    return e;
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  editUser,
  deleteUser,
  UserLogin,
};
