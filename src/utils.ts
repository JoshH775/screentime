import { Media, Show } from "./App";

export function isShow(media: Media): media is Show {
    return (media as Show).season !== undefined
  }
  