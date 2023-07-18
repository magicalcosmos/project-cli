#!/usr/bin/env node
import {Command} from "commander"
import inquirer from "inquirer"
import {downloadTemplate} from './download'
import {modifyPackageJson} from './modify'

const templateGitUrl = 'http://github.com/terwer/zhi-log'
let downloadPath = null

const InitPrompts = [
  {
    name: 'description',
    message: 'please input description',
    default: ''
  },
  {
    name: 'author',
    message: 'please input author',
    default: ''
  }
]

const program = new Command()

program
  .name("cosmos")
  .description("application generator, include vue, react, nextjs, angular")
  .version("0.0.1")

program
  .command("init <name>")
  .description("init a cosmos project")
  .action(async (name: string, branch: string) => {
    console.log(`start init ${name} project`);
    const feat = branch ?? "main"
    console.log("current branch:", feat)
    const initOptions = await inquirer.prompt(InitPrompts);
    console.log('initOptions', initOptions);

    try {
      downloadPath = `./${name}`
      await downloadTemplate(templateGitUrl, downloadPath, feat);
      await modifyPackageJson(downloadPath, {name, ...initOptions});
    } catch (error) {
      console.error(error)
    }
  })

program.parse()

