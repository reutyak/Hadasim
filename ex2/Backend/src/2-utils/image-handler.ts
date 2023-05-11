import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";

const memberImagesFolder = "./src/1-assets/images/members/";

// Save new image:
async function saveImage(image: UploadedFile): Promise<string> {
  // Create unique image name:
  const uniqueImageName = createImageName(image.name);

  // Create absolute path:
  const absolutePath = memberImagesFolder + uniqueImageName;

  // Save to disk:
  await image.mv(absolutePath);

  // Return new name:
  return uniqueImageName;
}

function createImageName(originalImageName: string): string {
  // Take original extension:
  const extension = originalImageName.substring(
    originalImageName.lastIndexOf(".")
  );

  // Create unique name including original extension (v4 = 36 chars uuid):
  const uniqueImageName = uuid() + extension;

  // Return unique name:
  return uniqueImageName;
};

function getAbsolutePath(imageName:string):string{
  return path.join(__dirname, "..","1-assets","images","members", imageName)

};


export default {
  saveImage,
  getAbsolutePath
};
