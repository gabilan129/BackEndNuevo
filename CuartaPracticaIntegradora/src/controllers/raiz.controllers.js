const Product = require("../dao/mongo/models/productModels")
const {findCartByUser} = require("../dao/mongo/carts.mongo")

const initialController = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let filter = req.query.filter;
    let sort = req.query.sort;
  
    if (limit == undefined) {
      limit = 10;
    } else {
      limit = parseInt(limit);
    }
  
    if (page == undefined) {
      page = 1;
    } else {
      page = parseInt(page);
    }
  
    if (sort == undefined) {
      sort = 1;
    } else {
      sort = parseInt(sort);
    }
  
    let options = {};
  
    options.limit = limit;
    options.page = page;
    options.sort = { price: sort };
  
    let filtro;
    let query = {};
  
    if (filter != undefined) {
      filtro = filter;
      query = { title: { $regex: filter, $options: "i" } }; // Filtro por nombre (insensible a mayúsculas/minúsculas)
    }

    let cart = await findCartByUser(req.user._id);
  
    Product.paginate(query, options)
  
      .then((pr) => {
        let productos = [];
        let prevLink;
        let nextLink;
  
        pr.docs.forEach((producto) => {
          let product = {
            _id: producto._id,
            title: producto.title,
            description: producto.description,
            code: producto.code,
            price: producto.price,
            status: producto.status,
            stock: producto.stock,
            category: producto.category,
            thumbnail: producto.thumbnail,
            owner: producto.owner ?? "admin",
            isowner: producto.owner == undefined ? false : producto.owner.equals(req.user._id)  ? true : false
          };
          productos.push(product);
        });
  
        if (pr.hasPrevPage == false) {
          prevLink = null;
        } else {
          prevLink = page - 1;
        }
  
        if (pr.hasNextPage == false) {
          nextLink = null;
        } else {
          nextLink = page + 1;
        }

        
  
        let data = {
          informacion: {
            status: pr.success,
            payload: productos,
            cartlength: cart?.productos != null ? cart.productos.length : 0,
            totalPages: pr.totalPages,
            prevPage: pr.prevPage,
            nextPage: pr.nextPage,
            page: pr.page,
            hasPrevPage: pr.hasPrevPage,
            hasNextPage: pr.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink,
            limit: pr.limit,
          },
          session: {
            username: req.user.username,
            admin: req.user.admin,
            userID: req.user._id,
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            premium: req.user.premium,
          },
        };
  
        res.status(200);
        res.render("products", data);
      })
      .catch((err) => res.status(500).send({ error: `Server Error ${err}` }));
}


module.exports = {
    initialController
}