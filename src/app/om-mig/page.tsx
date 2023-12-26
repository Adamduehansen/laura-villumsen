import { wordPressClient } from '@/services/WordPressClient';
import Image from 'next/image';
import parse from 'node-html-parser';

export default async function About(): Promise<JSX.Element> {
  const { data } = await wordPressClient.getPageData('/om-mig');

  if (data.content === null) {
    throw new Error('Redirect to 404');
  }

  const root = parse(data.content);

  const textElement = root.querySelector('p');
  const cvElements = root.querySelectorAll(':scope > figure');

  return (
    <div className='pt-main lg:grid lg:grid-cols-12'>
      <div className='lg:flex lg:flex-col lg:col-span-7'>
        <p className='text-[2rem] leading-9 mx-grid mb-5 lg:order-2'>
          {textElement!.innerHTML}
        </p>
        {data.image && (
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            className='mb-5 lg:order-1'
          />
        )}
      </div>
      <div className='lg:col-span-3 lg:col-start-9'>
        {cvElements.map((cvElement, index): JSX.Element => {
          const figcaptionElement = cvElement.querySelector('figcaption')!;
          const title = figcaptionElement.textContent;
          figcaptionElement.remove();

          return (
            <div key={index} className='mx-grid'>
              <h3>{title}</h3>
              <figure
                className='mb-5 cvlist'
                dangerouslySetInnerHTML={{
                  __html: cvElement.innerHTML,
                }}
              ></figure>
            </div>
          );
        })}
      </div>
    </div>
  );
}
