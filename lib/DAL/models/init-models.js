import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Artiste from  "./Artiste.js";
import _Concert from  "./Concert.js";
import _Joue from  "./Joue.js";
import _Participe from  "./Participe.js";
import _Realise from  "./Realise.js";
import _Style from  "./Style.js";
import _Ville from  "./Ville.js";
import _Visiteur from  "./Visiteur.js";

export default function initModels(sequelize) {
  const Artiste = _Artiste.init(sequelize, DataTypes);
  const Concert = _Concert.init(sequelize, DataTypes);
  const Joue = _Joue.init(sequelize, DataTypes);
  const Participe = _Participe.init(sequelize, DataTypes);
  const Realise = _Realise.init(sequelize, DataTypes);
  const Style = _Style.init(sequelize, DataTypes);
  const Ville = _Ville.init(sequelize, DataTypes);
  const Visiteur = _Visiteur.init(sequelize, DataTypes);

  Artiste.belongsToMany(Concert, { as: 'idConcert_Concert_Realises', through: Realise, foreignKey: "IdArtiste", otherKey: "idConcert" });
  Concert.belongsToMany(Artiste, { as: 'IdArtiste_Artistes', through: Realise, foreignKey: "idConcert", otherKey: "IdArtiste" });
  Concert.belongsToMany(Style, { as: 'idStyle_Styles', through: Joue, foreignKey: "idConcert", otherKey: "idStyle" });
  Concert.belongsToMany(Visiteur, { as: 'idVisiteur_Visiteurs', through: Participe, foreignKey: "idConcert", otherKey: "idVisiteur" });
  Style.belongsToMany(Concert, { as: 'idConcert_Concerts', through: Joue, foreignKey: "idStyle", otherKey: "idConcert" });
  Visiteur.belongsToMany(Concert, { as: 'idConcert_Concert_Participes', through: Participe, foreignKey: "idVisiteur", otherKey: "idConcert" });
  Realise.belongsTo(Artiste, { as: "IdArtiste_Artiste", foreignKey: "IdArtiste"});
  Artiste.hasMany(Realise, { as: "Realises", foreignKey: "IdArtiste"});
  Joue.belongsTo(Concert, { as: "idConcert_Concert", foreignKey: "idConcert"});
  Concert.hasMany(Joue, { as: "Joues", foreignKey: "idConcert"});
  Participe.belongsTo(Concert, { as: "idConcert_Concert", foreignKey: "idConcert"});
  Concert.hasMany(Participe, { as: "Participes", foreignKey: "idConcert"});
  Realise.belongsTo(Concert, { as: "idConcert_Concert", foreignKey: "idConcert"});
  Concert.hasMany(Realise, { as: "Realises", foreignKey: "idConcert"});
  Artiste.belongsTo(Style, { as: "idStyle_Style", foreignKey: "idStyle"});
  Style.hasMany(Artiste, { as: "Artistes", foreignKey: "idStyle"});
  Joue.belongsTo(Style, { as: "idStyle_Style", foreignKey: "idStyle"});
  Style.hasMany(Joue, { as: "Joues", foreignKey: "idStyle"});
  Concert.belongsTo(Ville, { as: "idVille_Ville", foreignKey: "idVille"});
  Ville.hasMany(Concert, { as: "Concerts", foreignKey: "idVille"});
  Visiteur.belongsTo(Ville, { as: "idVille_Ville", foreignKey: "idVille"});
  Ville.hasMany(Visiteur, { as: "Visiteurs", foreignKey: "idVille"});
  Participe.belongsTo(Visiteur, { as: "idVisiteur_Visiteur", foreignKey: "idVisiteur"});
  Visiteur.hasMany(Participe, { as: "Participes", foreignKey: "idVisiteur"});
  Visiteur.belongsTo(Visiteur, { as: "idParrain_Visiteur", foreignKey: "idParrain"});
  Visiteur.hasMany(Visiteur, { as: "Visiteurs", foreignKey: "idParrain"});

  return {
    Artiste,
    Concert,
    Joue,
    Participe,
    Realise,
    Style,
    Ville,
    Visiteur,
  };
}
