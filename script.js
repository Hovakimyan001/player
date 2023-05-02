let artistName = document.querySelector('.artist-name');
let songName = document.querySelector('.song-name');
let songCategory = document.querySelector('.song-category');
let audioCurrentTime = document.querySelector('.audio-currenttime');
let durationRange = document.querySelector('.duration-range');
let audioDuration = document.querySelector('.audio-duration');
let artistPicture = document.querySelector('.artist-picture');
let redo = document.querySelector('.redo');
let undo = document.querySelector('.undo');
let playpause = document.querySelector('.playpause');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let audioPlayer = document.querySelector('.audio-player');
let A = document.querySelector('.A');
let B = document.querySelector('.B');
let off = document.querySelector('.off');
let speedButtons = document.querySelectorAll('.speed > button');
let volumeRange = document.querySelector('.volume-range');
let playlist = document.querySelector('.playlist');
let playlistItem;
let catItem = document.querySelectorAll('.cat-item')
let filterResult = []



let list = [
    {
        artist: 'Timati',
        name: 'AMG',
        category: 'Rap',
        song: 'audio/timati.mp3',
        photo: 'picture/timati.jpg'
    },
    {
        artist: 'Guf',
        name: 'Ураган',
        category: 'Rap',
        song: 'audio/guf.mp3',
        photo: 'picture/guf.jpg'
    },
    {
        artist: 'Santiz',
        name: 'Растафарай',
        category: 'Rap',
        song: 'audio/santiz.mp3',
        photo: 'picture/santiz.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Rap',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Hip-Hop',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Hip-Hop',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Classic',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Classic',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Jaz',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Jaz',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Rock',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Rock',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Opera',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Opera',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Bluse',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Bluse',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Electronic',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
    {
        artist: 'Egor Kreed',
        name: 'We gotta got love',
        category: 'Electronic',
        song: 'audio/egor.mp3',
        photo: 'picture/egor.jpg'
    },
];

function load(arrayname) {
    artistName.innerText = arrayname.artist;
    songName.innerText = arrayname.name;
    songCategory.innerText = arrayname.category;
    audio.src = arrayname.song;
    artistPicture.style.background = `url(${arrayname.photo})`
    audioPlayer.style.background = `url(${arrayname.photo})`
}

let forA, forB;
let checked = false;
let active = 0;
let isPlay = false;
load(list[active]);

function playing() {
    isPlay = true;
    audio.play();
    playpause.className = 'fa fa-pause'
}

function pauseing() {
    isPlay = false;
    audio.pause();
    playpause.className = 'fa fa-play'
}

playpause.onclick = () => !isPlay ? playing() : pauseing();
redo.onclick = () => audio.currentTime -= 10;
undo.onclick = () => audio.currentTime += 10;
volumeRange.oninput = () => audio.volume = volumeRange.value / 100;

function intervalRemove() {
    forA = undefined;
    forB = undefined;
    A.style.background = 'orangered';
    B.style.background = 'orangered';
}

next.onclick = () => {
    active++
    active > filterResult.length - 1 ? active = 0 : '';
    load(filterResult[active]);
    playing()
    intervalRemove();
    speedButtons.forEach(sp => sp.classList.remove('active-speed'));
    playlistItem.forEach(p => p.classList.remove('activesong'));
    playlistItem[active].classList.add('activesong');
}

prev.onclick = () => {
    active--
    active < 0 ? active = filterResult.length - 1 : '';
    load(filterResult[active]);
    playing();
    intervalRemove();
    speedButtons.forEach(sp => sp.classList.remove('active-speed'));
    playlistItem.forEach(p => p.classList.remove('activesong'));
    playlistItem[active].classList.add('activesong');
}

speedButtons.forEach(speed => speed.onclick = () => {
    audio.playbackRate = speed.innerText;
    speedButtons.forEach(sp => sp.classList.remove('active-speed'))
    speed.classList.add('active-speed');
});

durationRange.oninput = () => {
    audio.currentTime = durationRange.value * audio.duration / 100;
}

audio.ontimeupdate = () => {
    if (audio.currentTime == 0) {
        durationRange.value = 0
    }
    else {
        durationRange.value = audio.currentTime * 100 / audio.duration;
        let curmin = Math.floor(audio.currentTime / 60)
        let cursec = Math.floor(audio.currentTime - curmin * 60);
        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        audioCurrentTime.innerText = `${curmin = curmin < 10 ? '0' + curmin : curmin}:${cursec = cursec < 10 ? '0' + cursec : cursec}`;
        audioDuration.innerText = `${durmin = durmin < 10 ? '0' + durmin : durmin}:${dursec = dursec < 10 ? '0' + dursec : dursec}`

        A.onclick = () => {
            checked = true;
            forA = audio.currentTime;
            A.style.background = 'white';
        }

        B.onclick = () => {
            checked ? forB = audio.currentTime : '';
            audio.currentTime = forA;
            B.style.background = 'white';
        }
        if (audio.currentTime > forB) {
            audio.currentTime = forA;
        }
        else {
            off.onclick = () => {
                intervalRemove();
            }
        }
    }

    if (audio.ended) {
        active++
        active > filterResult.length - 1 ? active = 0 : '';
        load(filterResult[active]);
        playing();
        playlistItem.forEach(p => p.classList.remove('activesong'));
        playlistItem[active].classList.add('activesong');
    }
}


list.forEach((item, index) => {
    playlist.innerHTML += `<div class="playlist-item">
    <div class="pic" style="background : url(${item.photo})"></div>
    <div class="names">
        <h2>${item.artist}</h2>
        <p>${item.name}</p>
    </div>
</div>`
    playlistItem = document.querySelectorAll('.playlist-item');

    playlistItem.forEach((element, i) => {
        element.onclick = () => {
            playlistItem.forEach(p => p.classList.remove('activesong'));
            element.classList.add('activesong');
            active = i;
            load(list[active]);
            playing();


        }

    })


});




playlistItem[0].classList.add('activesong');



catItem.forEach(cat => {
    cat.onclick = () => {
        playlist.innerHTML = ''
        filterResult = []
        list.forEach(item => {
            if (cat.innerText == item.category) {
                filterResult.push(item)
                playlist.innerHTML += `<div class="playlist-item">
                <div class="pic" style="background : url(${item.photo})"></div>
                <div class="names">
                    <h2>${item.artist}</h2>
                    <p>${item.name}</p>
                </div>
            </div>`

            }
        });
        playlistItem = document.querySelectorAll('.playlist-item');
        playlistItem.forEach((play, i) => {
            play.onclick = () => {
                playlistItem.forEach(p => p.classList.remove('activesong'));
                play.classList.add('activesong');
                active = i;
                load(filterResult[active]);
                playing();
            }
        })
    }
});





//////////////////////////////////////////////////////////////////////////////////////
let root = document.querySelector(':root')
let colorList = ['#a8dadc', '#ef233c', '#2d6a4f', '#ffc300', '#55a630', '#3c096c'];
let color = document.querySelectorAll('.text .color')
let color1 = document.querySelectorAll('.back .color')

colorList.forEach((col, i) => {
    color[i].style.background = col
    color[i].onclick = () => {
        root.style.setProperty('--color', col)
        color.forEach(bord => bord.classList.remove('bord'))
        color[i].classList.add('bord')
    }
})

colorList.forEach((col, i) => {
    color1[i].style.background = col
    color1[i].onclick = () => {
        root.style.setProperty('--color1', col)
        color1.forEach(bord => bord.classList.remove('bord'))
        color1[i].classList.add('bord')
    }
})

let colors = document.querySelector('.colors')
let palette = document.querySelector('.fa-palette')
palette.onmouseover = () => {
    colors.style.left = '0%'
    palette.style.opacity = '0'
}

colors.onmouseover = () => {
    colors.style.left = '0%'
    palette.style.opacity = '0'
}

colors.onmouseout = () => {
    colors.style.left = '-80px'
    palette.style.opacity = '1'

}