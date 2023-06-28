import {Router} from 'express';
import { GraphQLSchema } from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import models from '#root/lib/DAL/index.js';
/*


#insert style
mutation  {   
  StyleCreate(    
    Style: {	  	
      libelle:"test",  	  
      description: "description chouette"		
    })
  {    idStyle,libelle  }
}
#select Style
#{  Style{    idStyle,libelle  }}

#insert visiteur
mutation  {   
  VisiteurCreate(    
    Visiteur: {	  	
      nom:"aubert",  	  
      prenom:"clément",  	  
      photo: "test"		
    })
  {    idVisiteur,photo  }
}
#insert visiteur
mutation  {   
  VisiteurUpdate(    
    Visiteur: {	  	
 			idVisiteur:1001,
      prenom:"clément2",  	  
      photo: "test"		
    })
  {    idVisiteur,photo  }
}
# selecft visiteur
123256595
123256590
query {
  Visiteur(where:{idVisiteur:123256595}){
    idVisiteur, nom, prenom, photo
  }
}

*/
const router = new Router();

// génération automatic de tous les models en schema graphQL
import graphMod from '#lib/graphcraft/src/index.js' //https://github.com/almost-full-stack/graphcraft

const options = {
  exclude: [],
  debug: true,
  dataloader: true,
  nestedMutations: true,
  findOneQueries: true,
}
// bug des permissions qui ne sont pas ou mal initialiée
const rules = {
  create : [],
  update : [],
  restore : [],
  destroy : [],
  fetch:[],
}
Object.keys( models).forEach( m =>{
  rules.create.push({model: m})
  rules.update.push({model: m})
  rules.restore.push({model: m})
  rules.destroy.push({model: m})
  rules.fetch.push({model: m})
})
options.permissions = () => {
  return Promise.resolve({
    rules
  });
}
//

const { generateSchema} = graphMod(options);
const schema = await generateSchema(models) // Generates the schema, return promise.

router.use('/', graphqlHTTP({  
    schema: new GraphQLSchema(schema),
    graphiql: true
}))

export default router;

