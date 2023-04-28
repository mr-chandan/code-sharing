import { mongooseConnection } from "@/lib/mongoos";
import { Code } from "@/models/code";


export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnection();


  if (method === "GET") {
    if (req.query?.id) {
      console.log(req.query?.id)
      const ff = await Code.find({ name: req.query?.id });
      console.log(ff)
      res.json(ff)
    }
  }


  if (method === "POST") {
    const { code, id,name } = req.body;
    const gg = await Code.create({
      name: id,
      code: code,
      username:name,
    });
    res.json(gg);
  }
}
