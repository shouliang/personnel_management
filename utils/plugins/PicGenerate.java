import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import java.util.ArrayList;

public class PicGenerate {

	/**
	 * 生成缩略图
	 * 
	 * @param fromFileStr
	 *            源图片路径
	 * @param saveToFileStr
	 *            缩略图路径
	 * @param width
	 *            缩略图的宽
	 * @param hight
	 *            缩略图的高
	 * @throws IOException
	 */
	public static void saveImageAsJpg(String fromFileStr, String saveToFileStr,
			int width, int hight) throws IOException {
		BufferedImage srcImage;
		String imgType = "JPEG";
		if (fromFileStr.toLowerCase().endsWith(".png")) {
			imgType = "PNG";
		}
		File saveFile = new File(saveToFileStr);
		File fromFile = new File(fromFileStr);
		srcImage = ImageIO.read(fromFile);
		if (width > 0 || hight > 0) {
			srcImage = resize(srcImage, width, hight);
		}
		ImageIO.write(srcImage, imgType, saveFile);
	}

	/**
	 * 将源图片的BufferedImage对象生成缩略图
	 * 
	 * @param source
	 *            源图片的BufferedImage对象
	 * @param targetW
	 *            缩略图的宽
	 * @param targetH
	 *            缩略图的高
	 * @return
	 */
	private static BufferedImage resize(BufferedImage source, int targetW,
			int targetH) {
		int type = source.getType();
		BufferedImage target = null;
		double sx = (double) targetW / source.getWidth();
		double sy = (double) targetH / source.getHeight();
		if (sx > sy) {
			sx = sy;
			targetW = (int) (sx * source.getWidth());
		} else {
			sy = sx;
			targetH = (int) (sy * source.getHeight());
		}

		if (type == BufferedImage.TYPE_CUSTOM) {
			ColorModel cm = source.getColorModel();
			WritableRaster raster = cm.createCompatibleWritableRaster(targetW,
					targetH);
			boolean alphaPremultiplied = cm.isAlphaPremultiplied();
			target = new BufferedImage(cm, raster, alphaPremultiplied, null);
		} else {
			target = new BufferedImage(targetW, targetH, type);
		}
		Graphics2D g = target.createGraphics();
		g.setRenderingHint(RenderingHints.KEY_RENDERING,
				RenderingHints.VALUE_RENDER_QUALITY);
		g.drawRenderedImage(source, AffineTransform.getScaleInstance(sx, sy));
		g.dispose();
		return target;
	}

	private static ArrayList<String> filelist = new ArrayList<String>();

	/*static void getFiles(String filePath) {
		File root = new File(filePath);
		File[] files = root.listFiles();
		for (File file : files) {
			if (file.isDirectory()) {
				
				 * 递归调用
				 
				getFiles(file.getAbsolutePath());

				// System.out.println("显示"+filePath+"下所有子目录及其文件"+file.getAbsolutePath());
			} else {
				filelist.add(file.getAbsolutePath());
				// System.out.println("显示"+filePath+"下所有子目录"+file.getAbsolutePath());
			}
		}
	}

	public static void main(String[] args) {
		// String filePath = "E://images//unpublishedGoods";
		String filePath = "E://317";
		getFiles(filePath);

		System.out.println(filelist.size());

		for (String p : filelist) {

			try {
				int i = -1;
				int j = 0;
				String tail = "";
				i = p.indexOf(".png");
				if (i < 0) {
					i = p.indexOf(".jpg");
					if (i < 0) {
						i = p.indexOf(".JPG");
						if (i < 0) {
							System.out.println(p);
							System.out.println("file not supported!");
						} else {
							j = i;
							tail = ".JPG";
						}
					} else {
						j = i;
						tail = ".jpg";
					}
				} else {
					j = i;
					tail = ".png";
				}

				String fileNamePath = p.substring(0, j);
				// System.out.println(fileNamePath);
				// 参数1（源图片路径），参数2 （缩略图路径），参数3（缩略图宽）参数4（缩略图高）
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_xlarge" + tail,
						660, 660);
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_large" + tail,
						420, 420);
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_middle" + tail,
						300, 300);
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_small" + tail,
						240, 240);
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_little" + tail,
						120, 120);
				PicGenerate.saveImageAsJpg(p, fileNamePath + "_micro" + tail,
						60, 60);

				// System.out.println("done!");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}*/

	public static void main(String[] args) {
		try {
			int i = -1;
			int j = 0;
			String tail = "";
			i = args[0].indexOf(".png");
			if (i < 0) {
				i = args[0].indexOf(".jpg");
				if (i < 0) {
					System.out.println("file not supported!");
				} else {
					j = i;
					tail = ".jpg";
				}
			} else {
				j = i;
				tail = ".png";
			}

			String fileNamePath = args[0].substring(0, j);
			// System.out.println(fileNamePath);
			// 参数1（源图片路径），参数2 （缩略图路径），参数3（缩略图宽）参数4（缩略图高）
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_xlarge" + tail, 660,660);
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_large" + tail, 420,420);
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_middle" + tail, 300,300);
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_small" + tail, 240,240);
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_little" + tail, 120,120);
			PicGenerate.saveImageAsJpg(args[0], fileNamePath + "_micro" + tail, 60,60);
			System.out.println("done!");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
