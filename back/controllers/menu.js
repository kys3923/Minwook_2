const Menu = require('../models/Menu');
const ErrorResponse = require('../utils/errorResponse');

exports.registerMenu = async (req, res, next ) => {

  const { name, caption, description, price, category, Sub_Category, stock_availability } = req.body;

  try {
    const menu = await Menu.create({
      name,
      caption,
      description,
      price,
      category,
      Sub_Category,
      stock_availability
    });

    res.json({
      message: "menu created",
      menu
    })
  } catch (error) {
    next(error);
  }
}

exports.listMenu = async (req, res, next ) => {

  const { name } = req.body;

  if(!name) {
    return next(new ErrorResponse("you need to provide the name", 400))
  }

  try {
    const menu = await Menu.find({
      name
    });

    res.json({
      message: "found menu listed",
      menu
    })
  } catch (error) {
    next(error);
  }
}

exports.listAllMenu = async (req, res, next ) => {

  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i"}} : {};

  try {
    const menu = await Menu.find(condition);

    res.json({
      message: "all menu listed",
      menu
    })
  } catch (error) {
    next(error);
  }
}



// exports.updateMenu = (req, res) => {
//   AppMenu.findByIdAndUpdate(req.params.id, req.body)
//   .then((menu) => {
//     return res.json({
//       message: "menu has been updated",
//       menu
//     })
//   })
//   .catch((error) => {
//     res.status(404).json({
//       message: "error at updating menu",
//       error: error.message
//     })
//   })
// }

// exports.deleteMenu = (req, res) => {
//   AppMenu.findByIdAndRemove(req.params.id, req.body)
//   .then((menu) => {
//     res.json({
//       message: "menu deleted",
//       menu
//     })
//   })
//   .catch((error) => {
//     res.status(404).json({
//       message: "error at deleting menu",
//       error: error.message
//     })
//   })
// }