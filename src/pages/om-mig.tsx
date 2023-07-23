import { getPageData } from '@/services/getPageData';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps } from '@/utils/models';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import parse from 'node-html-parser';

type PageData = PageProps;

export default function About(props: PageData): JSX.Element {
  const root = parse(props.content);

  const textElement = root.querySelector('p');
  const cvElements = root.querySelectorAll(':scope > figure');

  return (
    <div className='pt-main md:pt-14'>
      <p>{textElement!.innerHTML}</p>
      {props.image && (
        <Image
          src={props.image.src}
          alt={props.image.alt}
          width={props.image.width}
          height={props.image.height}
        />
      )}
      {cvElements.map((cvElement, index): JSX.Element => {
        const figcaptionElement = cvElement.querySelector('figcaption')!;
        const title = figcaptionElement.textContent;
        figcaptionElement.remove();

        return (
          <div key={index}>
            <h3>{title}</h3>
            <figure
              dangerouslySetInnerHTML={{
                __html: cvElement.innerHTML,
              }}
            ></figure>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageData> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/om-mig');

  return {
    props: {
      ...pageData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
