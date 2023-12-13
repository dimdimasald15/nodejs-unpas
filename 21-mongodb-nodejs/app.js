const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "db_universitas";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("mahasiswa");
  //   Menambahkan 1 data ke database
  // const insertResult = await collection.insertOne(
  //     {
  //       nama: "Gilang",
  //       email: "gilang@gmail.com",
  //       nohp: "07854939902",
  //     });
  //   console.log("Inserted documents =>", insertResult);

  //   Menambahkan lebih dari 1 data ke database
  //   const insertResult = await collection.insertMany(
  //     [{
  //         nama: "Gandhi",
  //         email: "gandhi@gmail.com",
  //         nohp: "08907095002",
  //       },{
  //         nama: "Kiki",
  //         email: "kiki@gmail.com",
  //         nohp: "085782900400",
  //       }]);
  //   console.log("Inserted documents =>", insertResult);

  // Mengubah data di dalam database
  // const updateResult = await collection.updateOne({ nama: "Kiki" }, { $set: { email: "kikidwi@mail.com" } });
  // console.log('Updated documents =>', updateResult);

  // Menghapus data di dalam database
//   const deleteResult = await collection.deleteMany({ nama: "Gandhi" });
//   console.log("Deleted documents =>", deleteResult);

// index a collection
const indexName = await collection.createIndex({ nama: 1 });
console.log('index name =', indexName);

  // menampilkan data secara spesifik di database
  //   const findResult = await collection.find({ nama: "Kiki" }).toArray();
  //   console.log("Found documents =>", findResult);

  //   Menampilkan semua data di database
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
