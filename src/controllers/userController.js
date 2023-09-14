const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const signUpSchema = Joi.object({
  name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .regex(/^(?=.*[A-Z])(?=.*\d)/) 
    .error(
      new Error(
        'La contraseña debe contener al menos una letra mayúscula y un número.'
      )),

  picture: Joi.string().required(),
  country: Joi.string().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
  .required()
  .regex(/^(?=.*[A-Z])(?=.*\d)/) 
  .error(
    new Error(
      'La contraseña debe contener al menos una letra mayúscula y un número.'
    )
  ),
});


const signUp = async (req, res) => {
  
  try {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    } else {
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  }
};


const signIn = async (req, res) => {
  try {
    const { error } = signInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ _id: user._id }, 'tu-secreto-seguro');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const signOut = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada correctamente' });
};

module.exports={
  signUp, signIn, signOut
}