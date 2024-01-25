import axios from "axios";
import Router from "express";

const flickerRouter = Router();

flickerRouter.get("/", async (req, res) => {
  res.send("Flicker server Up and running!!");
});

flickerRouter.get("/photos", async (req, res) => {
  const { keyword } = req.query;
  let params;
  keyword
    ? (params = {
        format: "json",
        nojsoncallback: 1,
        tags: keyword,
      })
    : (params = {
        format: "json",
        nojsoncallback: 1,
      });

  try {
    const response = await axios.get(
      "https://www.flickr.com/services/feeds/photos_public.gne",
      {
        params,
      }
    );
    const images = response.data.items.map((item: any) => ({
      title: item.title,
      media: item.media && item.media.m ? item.media.m : "",
    }));
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default flickerRouter;
