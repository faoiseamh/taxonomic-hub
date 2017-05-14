import React, { Component } from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  PinterestShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  PinterestShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const PinterestIcon = generateShareIcon('pinterest');

class SharingBar extends Component {
  render() {
    const shareUrl = window.location.href;
    const title = 'Action Hub';

    return (
      <div className="sharebuttons">
        <div className="Demo__some-network share-icon">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="Demo__some-network share-icon">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <div className="Demo__some-network__share-count">
            &nbsp;
          </div>
        </div>

        <div className="Demo__some-network share-icon">
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>

        <div className="Demo__some-network share-icon">
          <PinterestShareButton
            url={String(window.location)}
            windowWidth={1000}
            windowHeight={730}
            className="Demo__some-network__share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <PinterestShareCount url={String(window.location)}
            className="Demo__some-network__share-count" />
        </div>

      </div>
    );
  }
}

export default SharingBar;
