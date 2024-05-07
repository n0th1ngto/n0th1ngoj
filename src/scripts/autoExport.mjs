import fs from 'fs-extra'

/**
 * 读取组件文件列表, 将组件统一通过 index.export 导出
 * @param folderPath 需要整合的文件夹 
 * @return void 在给出的文件目录下创建 index.export 整合文件
 */
async function exportInit(folderPath) {
  try {
    const files = await fs.readdir(`./src/${folderPath}`)
    if (Array.isArray(files)) {
      let exportStr = ''
      for (const item of files) {
        if (fs.lstatSync(`./src/${folderPath}/${item}`).isDirectory()) {
          await exportInit(`${folderPath}/${item}`);
        } else {
          const componentName = item.slice(0, item.indexOf('.'))
          if (/^[A-Z][a-zA-Z]*$/.test(componentName)) {
            exportStr = `${exportStr}\nexport { default as ${componentName} } from './${item}'`
          }
        }
      }
      exportStr = exportStr.slice(1)
      exportStr += '\n'
      fs.writeFile(`./src/${folderPath}/index.export.ts`, exportStr)
    }
  } catch (error) {
    console.err('Error exporting components:', error)
  }
}

const folderPaths = ['layouts', 'components', 'views']

folderPaths.forEach(folderPath => {
  exportInit(folderPath)
})
