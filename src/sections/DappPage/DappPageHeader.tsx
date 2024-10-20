import expandIcon from "../../assets/icons/expand.svg";
import flagIcon from "../../assets/icons/flag.svg";
import Button from "../../components/Button/Button";
import SocialLink from "../../components/SocialLink/SocialLink";
import Tag from "../../components/Tag/Tag";
import DappPageRating from "./DappPageRating";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const HeaderButtonsContainer = styled.div`
  .visit-button {
    padding: 10px 24px;
    line-height: normal;
  }

  .share-button {
    width: 40px;
    height: 40px;
  }
`;

const linkOrder = [
  "twitter",
  "linkedin",
  "telegram",
  "medium",
  "discord",
  "github",
  "youtube",
  "mirror",
] as unknown as Array<keyof Links>;

const DappPageHeader = ({
  dappInfo,
  dappKey,
}: {
  dappInfo: DappInfo;
  dappKey: string;
}) => {
  const handleLinksOrder = () => {
    const links = dappInfo.links;
    const orderedLinks: Array<{ name: keyof Links; link: string }> = [];
    linkOrder.forEach((link) => {
      if (links[link]) {
        orderedLinks.push({ name: link, link: links[link] });
      } else {
        orderedLinks.push({ name: link, link: "" });
      }
    });
    return orderedLinks;
  };

  return (
    <section className="flex px-4 flex-col xl:grid xl:gap-x-16 xl:grid-cols-dapp-header">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] leading-[34px] font-bold">
              {dappInfo.name}
            </h1>
            {dappInfo.links?.website && (
              <Link href={dappInfo.links.website + "?utm_source=Alphland"}>
                <a
                  className="block text-xl leading-[26px] font-semibold text-orange mt-4"
                  target="_blank"
                >
                  {new URL(dappInfo.links.website).hostname}
                  <sup className="ml-2">
                    <Image src={expandIcon} alt="expand icon" />
                  </sup>
                </a>
              </Link>
            )}
          </div>
          <a
            href="https://x.com/fugashu_codes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-semibold text-[15px] leading-[20px] text-lightgrey ml-4"
          >
            <Image src={flagIcon} alt="flag icon" />
            <span className="ml-2">Report</span>
          </a>
        </div>
        <p className="mt-6 font-light md:text-[20px] md:leading-[26px]">
          {dappInfo.description}
        </p>
        {dappInfo.group?.length > 0 && (
          <p className="mt-6 font-light md:text-[20px] md:leading-[26px]">
            Deployed on: {dappInfo.group}
          </p>
        )}
        <HeaderButtonsContainer className="flex mt-8">
          {
            <Link
              href={dappInfo.links?.website + "?utm_source=Alphland" || "/"}
              passHref
            >
              <Button
                variant="primary"
                className="mr-3 visit-button"
                target="_blank"
                rel="noopener"
              >
                Visit Dapp
              </Button>
            </Link>
          }
        </HeaderButtonsContainer>
      </div>
      <div>
        {dappInfo.tags.length > 0 && (
          <div className="mt-16 xl:mt-0">
            <h2 className="text-[28px] leading-[34px] font-bold">Tags</h2>
            <div className="flex mt-4 flex-wrap">
              {dappInfo.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-[28px] leading-[34px] font-bold">Links</h2>
          <div className="flex mt-4">
            {handleLinksOrder().map((link) => (
              <SocialLink key={link.name} name={link.name} link={link.link} />
            ))}
          </div>
        </div>
      </div>
      <DappPageRating dappKey={dappKey} />
    </section>
  );
};

export default DappPageHeader;
