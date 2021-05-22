/* Base Function */

/**
* @param fetch_file String 远程文件web地址
* @param local_file String 本地文件路径
* */
const godWriteFile = (fetch_file, local_file) => {
  let local = request(local_file);
  let fetch = request(fetch_file);
  if (!local || local != fetch) writeFile(local_file, fetch)
}

/* Base Function */

/* Customize Function */

const tyrantgenesis = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/data/base.json", 'hiker://files/TyrantG/data/base.json')
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/tyrantgenesis.js", 'hiker://files/TyrantG/tyrantgenesis.js')
}

const douyu_live = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/LIVE/douyu.js", 'hiker://files/TyrantG/LIVE/douyu.js')
}

const yande_re = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/GHS/yande.re.js", 'hiker://files/TyrantG/GHS/yande.re.js')
}

const pornhub = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/GHS/pornhub.js", 'hiker://files/TyrantG/GHS/pornhub.js')
}

const spankbang = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/GHS/spankbang.js", 'hiker://files/TyrantG/GHS/spankbang.js')
}

const aktool = _ => {
  godWriteFile("https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/TOOL/aktool.js", 'hiker://files/TyrantG/TOOL/aktool.js')
}

/* Customize Function */