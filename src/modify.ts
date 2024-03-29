import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"
import ora from "ora"

const log = ora("modify")

export const modifyPackageJson = function (downloadPath: string, options: any) {
  const packagePath = path.join(downloadPath, "package.json")
  log.start("start modifying package.json")
  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)

    const param = {
      name: options.name,
      description: options.description,
      author: options.author,
    }

    const result = template(param)
    fs.writeFileSync(packagePath, result)
    log.stop()
    log.succeed("modify package.json complate")
  } else {
    log.stop()
    log.fail("modify package.json fail")
    throw new Error("no package.json")
  }
}

