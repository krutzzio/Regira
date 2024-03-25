// Es defineix la configuració de sequelize
const { Sequelize, DataTypes } = require('sequelize'); // Importa la llibreria Sequelize

const bcrypt = require('bcrypt'); // Importa la llibreria bcrypt per a encriptar contrasenyes

const sequelize = new Sequelize('regira2', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql' // connectem a mysql
});



// Model per a la taula Projectes
const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Model per a la taula Issues
const Issue = sequelize.define('Issue', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.ENUM('bug', 'feature', 'task'),
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'open'
    }
});

// Model per a la taula Usuaris
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hooks:{
        beforeCreate: async (user) => {
            const passHashed = await bcrypt.hash(user.password, 10)
            user.password = passHashed;
        }
    }
});

// Model per a la taula Comentaris
const Comment = sequelize.define('Comment', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING
    }
});

// Model per a la taula Tags
const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


// Definim les relacions
Project.hasMany(Issue); // Un projecte pot tenir diversos issues
Issue.belongsTo(Project); // Un issue pertany a un únic projecte

User.hasMany(Project);
Project.belongsTo(User);

Issue.belongsTo(User, { as: 'author' }); // Un issue té un autor (usuari que l'ha creat)
Issue.belongsTo(User, { as: 'assignee' }); // Un issue té un usuari assignat

Issue.hasMany(Comment); // Un issue pot tenir diversos comentaris
Comment.belongsTo(Issue); // Un comentari pertany a un únic issue

User.hasMany(Comment); // Un usuari pot crear molts comentaris
Comment.belongsTo(User); // Un comentari pertany a un únic usuari

Issue.belongsToMany(Tag, { through: 'IssueTag' });
Tag.belongsToMany(Issue, { through: 'IssueTag' });



// connectem a base de dades i creem un primer usuari
async function iniDB() {
    await sequelize.sync({ force: true });
}


//iniDB();

//Exportem els models
module.exports = {
    Project,
    Issue,
    User,
    Comment,
    Tag,
    sequelize // Si vols utilitzar la instància de Sequelize per a altres operacions
};