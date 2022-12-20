const fs = require("fs");
const login = require("fb-chat-api");
var respon = fs.readFileSync("respon.json","utf8")
var res = JSON.parse(respon)
//var know = fs.readFileSync("question.txt","utf8").split("\n")
login({appState: JSON.parse(fs.readFileSync('app.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    console.log(`
╭━━━╮╱╱╭╮╱╱╱╱╱╱╭╮╱╱╱╱╭╮
┃╭━╮┃╱╭╯╰╮╱╱╱╱╱┃┃╱╱╱╭╯╰╮
┃┃╱┃┣╮┣╮╭╋━━┳━━┫╰━┳━┻╮╭╯
┃╰━╯┃┃┃┃┃┃╭╮┃╭━┫╭╮┃╭╮┃┃
┃╭━╮┃╰╯┃╰┫╰╯┃╰━┫┃┃┃╭╮┃╰╮
╰╯╱╰┻━━┻━┻━━┻━━┻╯╰┻╯╰┻━╯
`)

    console.log("OK LOGIN SUCCESS ! ")
    api.setOptions({listenEvents: true});
    api.listen((err,mess)=>{
    var response = Object.keys(res)
    var question = Object.values(res)
    switch(mess.type){
    case "message":
        if(mess.body.startsWith("/spamtag")){
        var se = mess.body.split(" ")
        var es = mess.mentions
        var ess = Object.keys(es)
        var cil = Object.values(es)
        if (se[3].length < 8){
        api.sendMessage("พิมพ์ให้เกิน8ตัวจ้า",mess.threadID)
        break}
        for (var fa=0;fa<se[4];fa++){
        api.sendMessage({body :se[3]+cil[0],
                      mentions:[{
                          tag:cil[0],
                          id:ess[0],
                          fromIndex:9,
                     }]
        },mess.threadID)}}
         if(mess.body.startsWith("/add")){
         var msg = mess.body.split(" ")
         if(msg[1] == undefined || msg[2] == undefined){
         return api.sendMessage("/add [คำถาม] [คำตอบ]",mess.threadID)}
         else if(msg.length > 3){return api.sendMessage("/add [คำถาม] [คำตอบ]",mess.threadID)}
         var key = msg[1]
         var value = msg[2]
         for (let g=0;g<response.length;g++){
         if (key == response[g]) return api.sendMessage("มีคำนี้อยู่ในระบบแล้วค่ะ !",mess.threadID)}
         res[key] = value
         api.sendMessage("แอดคำพูดสำเร็จแล้วค่ะ",mess.threadID)
         break}
         for (let i=0;i<response.length;i++){
         var key = response[i]
         var regexp = new RegExp(key)
         if(mess.body.match(regexp)){
         var valui = key
         var mo = question[i]
         break
         }}
         if(valui){
         return api.sendMessage(mo,mess.threadID)}
         /*
         else{
         var now = know[Math.floor(Math.random()*know.length)]
         return api.sendMessage(now,mess.threadID)}
         case "event":
         switch(mess.logMessageData.theme_color){
         case "FF5E007E":
         api.sendMessage("หึมม มีใจให้เราแน่เลย < 3",mess.threadID)
           break
         case "FF6EDF00":
         api.sendMessage("ตั้งสีแชทสีเขียวหมายความว่ายังใงกันนะ",mess.threadID)
           break
         case "FF0099FF":
         api.sendMessage("สีนี้รู้สึกไม่ค่อยดีเลย แฮ่ะ",mess.threadID)
           break 
         case "FFFB45DE":
         api.sendMessage("ตั้งสีนี้เป็นแฟนเลยมั้ย",mess.threadID)
           break
           case "FFF9005A":
           api.sendMessage("เอาแหวนเลยมั้ย หึม?",mess.threadID)
           break
           case "FFFF311E":
           api.sendMessage("คิดไงถึงตั้งสีนี้",mess.threadID)
           break
           case "FFFAAF00":
           api.sendMessage("โอ้ววเธอมันสว่างเกินไป",mess.threadID)
           break}
          case "message_reaction":
          switch(mess.reaction){
          case "😆":
          api.sendMessage("เธอหัวเราะทำไม",mess.threadID)
          break
          case "😢":
          api.sendMessage("ไม่เศร้าสิ",mess.threadID)
          break
          case "👍":
          api.sendMessage("กดไลค์ที่แปลว่าชอบปะ",mess.threadID)
          break
          case "😠":
          api.sendMessage("โกรธทำไม",mess.threadID)
          break
          case "😮":
          api.sendMessage("ว้าวทำไมอะ",mess.threadID)
          break}

          */
}
})
});
process.on('uncaughtException', function (err) {
});
process.on('unhandledRejection', function (err) {
});
 
