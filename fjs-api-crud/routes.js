const express = require('express'); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const multer = require('multer'); // Importa la llibreria multer per gestionar peticions de fitxers
const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require('jsonwebtoken'); // Importa la llibreria jsonwebtoken per a generar i verificar JWT

const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo"; // Clau secreta per a la generació de JWT

const { Project, Issue, Comment, Tag, User } = require('./models'); // Importa els models de dades

const {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsUser
} = require('./generics'); // Importa les funcions per a realitzar operacions CRUD genèriques

// Configuració de multer per gestionar la pujada de fitxers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../front_bolets/public/img') // Especifica la carpeta de destinació dels fitxers pujats
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`) // Assigna un nom únic als fitxers pujats
    }
})

const upload = multer({ storage: storage }).single('foto'); // Configura multer per a gestionar la pujada d'un únic fitxer amb el camp 'foto'


// AUTENTICACIO
// AUTENTICACIO
// AUTENTICACIO
// AUTENTICACIO

// Middleware per verificar el JWT en la cookie
const checkToken = (req, res, next) => {
    const token = req.cookies?.token; // Obté el token des de la cookie de la petició
    console.log(token, req.cookies)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // Retorna error 401 si no hi ha cap token
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
        req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
        next(); // Passa al següent middleware
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' }); // Retorna error 401 si el token és invàlid
    }
};

// CRUD
// CRUD
// CRUD
// CRUD
// CRUD
// CRUD


// Operacions CRUD per als Projects
router.get('/projects', checkToken, async (req, res) => await readItemsUser(req, res, Project)); // Llegeix tots els projectes
router.get('/projects/:id', async (req, res) => await readItem(req, res, Project)); // Llegeix un projecte específic
router.put('/projects/:id', async (req, res) => await updateItem(req, res, Project)); // Actualitza un projecte
router.delete('/projects/:id', async (req, res) => await deleteItem(req, res, Project)); // Elimina un projecte


// Operacions CRUD per als Issues
router.get('/comments', async (req, res) => await readItems(req, res, Issue)); // Llegeix tots els bolets
router.get('/comments/:id', async (req, res) => await readItem(req, res, Issue)); // Llegeix un bolet específic
router.put('/comments/:id', async (req, res) => await updateItem(req, res, Issue)); // Actualitza un bolet
router.delete('/comments/:id', async (req, res) => await deleteItem(req, res, Issue)); // Elimina un bolet

// Operacions CRUD per als Issues
router.get('/issues', async (req, res) => await readItems(req, res, Issue)); // Llegeix tots els bolets
router.get('/issues/:id', async (req, res) => await readItem(req, res, Issue)); // Llegeix un bolet específic
router.put('/issues/:id', async (req, res) => await updateItem(req, res, Issue)); // Actualitza un bolet
router.delete('/issues/:id', async (req, res) => await deleteItem(req, res, Issue)); // Elimina un bolet

// Operacions CRUD per a les Etiquetes
router.post('/tags', async (req, res) => await createItem(req, res, Tag)); // Crea una etiqueta
router.get('/tags', async (req, res) => await readItems(req, res, Tag)); // Llegeix totes les etiquetes
router.get('/tags/:id', async (req, res) => await readItem(req, res, Tag)); // Llegeix una etiqueta específica
router.put('/tags/:id', async (req, res) => await updateItem(req, res, Tag)); // Actualitza una etiqueta
router.delete('/tags/:id', async (req, res) => await deleteItem(req, res, Tag)); // Elimina una etiqueta

// Operacions CRUD per als Usuaris
router.get('/users', async (req, res) => await readItems(req, res, User)); // Llegeix tots els usuaris
router.get('/users/:id', async (req, res) => await readItem(req, res, User)); // Llegeix un usuari específic
router.put('/users/:id', async (req, res) => await updateItem(req, res, User)); // Actualitza un usuari
router.delete('/users/:id', async (req, res) => await deleteItem(req, res, User)); // Elimina un usuari

// Endpoint per crear un bolet (amb foto) (afegit checkToken)
router.post('/projects', checkToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu ID
        if (!user) {
            return res.status(500).json({ error: 'User no trobat' }); // Retorna error 500 si no es troba l'usuari
        }
        const { name, desc } = req.body;
        const project = await user.createProject({ name, desc })
        res.status(201).json(project)
        /*upload(req, res, async function (err) { // Gestiona la pujada del fitxer
            if (err) {
                return res.status(500).json({ error: err.message }); // Retorna error 500 si hi ha algun error en la pujada del fitxer
            }
            if (req.file) {
                req.body.foto = req.file.filename; // Assigna el nom del fitxer pujat al camp 'foto'
            }

            const item = await Bolet.create(req.body); // Crea un nou bolet amb les dades rebudes
            res.status(201).json(item); // Retorna l'objecte del bolet creat amb el codi d'estat 201 (Creat)
        });*/

    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


// Endpoint per vincular una etiqueta a un bolet
router.post('/bolets/:boletId/tags/:tagId', async (req, res) => {
    try {
        const bolet = await Bolet.findByPk(req.params.boletId); // Cerca el bolet pel seu ID
        const tag = await Tag.findByPk(req.params.tagId); // Cerca l'etiqueta pel seu ID
        if (!bolet || !tag) {
            return res.status(404).json({ error: 'Bolet o Tag no trobats' }); // Retorna error 404 si el bolet o l'etiqueta no es troben
        }
        await bolet.addTag(tag); // Afegeix l'etiqueta al bolet
        res.json({ message: 'Tag linkat' }); // Retorna missatge d'èxit
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


// Endpoint per obtenir totes les etiquetes per a un bolet
router.get('/bolets/:boletId/tags', async (req, res) => {
    try {
        const bolet = await Bolet.findByPk(req.params.boletId); // Cerca el bolet pel seu ID
        if (!bolet) {
            return res.status(404).json({ error: 'Bolet no trobat' }); // Retorna error 404 si el bolet no es troba
        }
        const tags = await bolet.getTags(); // Obté totes les etiquetes associades al bolet
        res.json(tags); // Retorna les etiquetes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

// Endpoint per obtenir els bolets per a una etiqueta
router.get('/tags/:tagtId/bolets', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.tagId, { include: Bolet }); // Cerca l'etiqueta pel seu ID, incloent els bolets associats
        if (!tag) {
            return res.status(404).json({ error: 'Tag no trobat' }); // Retorna error 404 si l'etiqueta no es troba
        }
        res.json(tag.bolets); // Retorna els bolets associats a l'etiqueta
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


// LOGIN I REGISTRE


// Endpoint per iniciar sessió d'un usuari
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Obté l'email i la contrasenya de la petició
    try {
        const user = await User.findOne({ where: { email } }); // Cerca l'usuari pel seu email
        if (!user) {
            return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
        }
        const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password incorrecte' }); // Retorna error 401 si la contrasenya és incorrecta
        }
        const token = jwt.sign({ userId: user.id, userName: user.name }, SECRET_KEY, { expiresIn: '2h' }); // Genera un token JWT vàlid durant 2 hores
        res.cookie('token', token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
        res.status(200).json({ message: 'LOGIN OK', name: user.name, id: user.id }); // Retorna missatge d'èxit
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});

// Endpoint per registrar un usuari
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body; // Obté el nom, email i contrasenya de la petició
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, i password requerits' }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
        }
        const existingUser = await User.findOne({ where: { email } }); // Comprova si l'email ja està registrat
        if (existingUser) {
            return res.status(400).json({ error: 'Email ja existeix' }); // Retorna error 400 si l'email ja està registrat
        }
        const user = await User.create({ name, email, password }); // Crea l'usuari amb les dades proporcionades
        res.status(201).json(user); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
    }
});


router.get('/refresh', checkToken, async (req, res) => {
    const user = await User.findByPk(req.userId); // Cerca l'usuari pel seu email
    if (!user) {
        return res.status(404).json({ error: 'User no trobat' }); // Retorna error 404 si l'usuari no es troba
    }
    return res.json({ id: user.id, name: user.name })
})




module.exports = router; // Exporta el router amb les rutes definides