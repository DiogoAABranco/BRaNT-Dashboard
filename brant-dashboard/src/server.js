import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      activity: Model,
    },

    seeds(server) {
      server.create("activity", 
            {id:0, 
            activityName:"Atividade 1", 
            description:"Descrição...",
            parameters:[
                {key:"parametro 1",value:1},
                {key:"parametro 2",value:2},
                {key:"parametro 3",value:3}]
            })
        server.create("activity", 
            {id:1, 
            activityName:"Atividade 2", 
            description:"Descrição...",
            parameters:[
                {key:"parametro 1",value:1},
                {key:"parametro 2",value:2},
                {key:"parametro 3",value:3}]
            })},

    routes() {
      this.namespace = "api"

      this.get("/activities", schema => {
        return schema.activities.all()
      })
    },
  })

  return server
}