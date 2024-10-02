export function initYoutube() {
    console.log("youtube");

    const getLinkVideo = (id) => {
        console.log(id);
        switch (id) {
            case "thumbnailVideo1":
                return "kK6xchWwXgE";
            case "thumbnailVideo2":
                return "RtAsaidYKNc";
            case "thumbnailVideo3":
                return "icUhCgdFe3Y";
            case "thumbnailVideo4":
                return "mrRlayYd_wM";
            case "thumbnailVideo5":
                return "a-pq7CvIjbU";
            default:
                return "";
        }
    }

    const loadYouTubeAPI = () => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    loadYouTubeAPI();

    const initVideoPlayer = (video, thumbnailElement) => {
        const thumbnailVideo = video.querySelector(".thumbnailVideo");
        thumbnailVideo.addEventListener("click", () => {
            const videoId = getLinkVideo(thumbnailVideo.id);
            if (videoId) {
                const playerContainer = document.createElement('div');
                playerContainer.style.width = '100%';
                playerContainer.style.height = '315px';
                thumbnailVideo.replaceWith(playerContainer);

                const player = new YT.Player(playerContainer, {
                    height: '315',
                    width: '100%',
                    videoId: videoId,
                    playerVars: {
                        'autoplay': 1,
                        'playsinline': 1
                    },
                    events: {
                        'onStateChange': (event) => {
                            if (event.data == YT.PlayerState.ENDED) {
                                player.destroy();
                                playerContainer.replaceWith(thumbnailElement.cloneNode(true));
                                initVideoPlayer(video, thumbnailElement);
                            }
                        }
                    }
                });
            }
        });
    };

    const videoContainer = document.querySelectorAll(".video");
    videoContainer.forEach(video => {
        const thumbnailVideo = video.querySelector(".thumbnailVideo");
        const thumbnailClone = thumbnailVideo.cloneNode(true);
        initVideoPlayer(video, thumbnailClone);
    });
}