const fs = require ("fs")
const { NFTStorage, File } = require ('nft.storage')

async function main() {

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUzOGZmM2E5MENhMGE5NDRFMDVGREUwNzVlRTM5QWRDRDI0YkJCODYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjI0MzAzNTQwOCwibmFtZSI6IkR1b01pbnQifQ.qKHdFPbj2dXNQCGN_VLOxuTKaeITLoQKh59_MuANBpM'
const client = new NFTStorage({ token: apiKey })

const metadata = await client.store({
  name: 'Zeko Badge',
  description: 'First Badge EVER!',
  image: new File([await fs.promises.readFile('badge.png')], 'badge.png', { type: 'image/png' })
})
console.log(metadata.url)
}

main()