const mongoose=require('mongoose');

async function main() {
    await mongoose.connect(`mongodb+srv://ahmedalisaber965:zamalek1911zamalek@cluster0.bi32k0f.mongodb.net/?retryWrites=true&w=majority`);
    console.log("connected to database successfully ✅✅✅✅");
  }
  main().catch(err => console.log(err));
  