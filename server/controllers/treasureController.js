const db = (req) => req.app.get('db');

const dragonTreasure = async (req, res) => {
  try {
      const treasure = await db(req).get_dragon_treasure(1);
      return res.status(200).send(treasure);
  } catch(err){
      console.log(`Error retrieving treasure: ${err}`);
  }
}

const getUserTreasure = async (req, res) => {
  const { id } = req.session.user;
  try {
      const treasure = await db(req).get_user_treasure(id);
      return res.status(200).send(treasure);
  } catch(err){
      console.log(`Error retrieving user treasure: ${err}`);
  }
}

module.exports = {
  dragonTreasure, getUserTreasure
}