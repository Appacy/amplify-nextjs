import { randomInt } from 'crypto';
import Image from 'next/image';

type Photo = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

async function getRandomPhoto() {
  const random = randomInt(5000);
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${random}`) 

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page1() {
  const photo: Photo = await getRandomPhoto();
  
  return (
    <>
      <h3>Page 1</h3>
      <Image
        src={photo.url}
        alt={photo.title}
        width={600}
        height={600}
      />
      <blockquote>{photo.title}</blockquote>
    </>
  )
}
