import mongoose from 'mongoose';
const db = mongoose.connect('mongodb://blogAdmin:123456@[148.70.223.218]:27017/blog', { useNewUrlParser: true }, err => {
          if (err) {
              console.log('出错---------->', err)
                } else {
                    console.log('链接成功')
                      }
                      })

