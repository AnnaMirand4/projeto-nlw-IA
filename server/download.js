import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const download = (videoID) => {
  const videoURL = "https://youtube.com/shorts/" + videoID
  console.log("Realizando o download do video:", videoID)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("Esse video não é um Short")
      }

      console.log(seconds)
    })
    .on("end", () => {
      console.log("Download do video finalizado.")
    })
    .on("error", () => {
      console.log(
        "Não foi possível fazer o download do video. Detalhes do erro",
        error
      )
    })
    .pipe(fs.createWriteStream("./temp/audio.mp4"))
}
