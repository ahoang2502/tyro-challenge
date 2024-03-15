The project uses the following packages:

`fast-csv` - passing csv
`multer` - upload file to server
`filesize` - check size of file

I'm not sure about the handling of different file sizes to make sure not to scale vertically so I check if file size is too big, an error will be thrown.

The sample csv file can be found in root directory under the name `file.csv`

I've also added the console.log when a new order is added to database.

To start the project:
`npm install`
`npm run dev`
