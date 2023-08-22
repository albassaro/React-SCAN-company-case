import { React } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/css/grid"

import global from "../styles/globalStyles.module.scss";
import sr from "../styles/components/slider_resultpage.module.scss"



function SliderResultPage(hystogramData) {

    const isDesktop = useMediaQuery({
        query: '(min-width: 1000px)'
      })
    const isMobile = useMediaQuery({
        query: '(max-width: 375px)'
      })

    const docsInfo = hystogramData.props[0].data;
    const docsRisk = hystogramData.props[1].data;

    let newArray =[
        {date:''}, 
        {total:''},
        {risks:''},
    ];

    for (let i=0; i<docsInfo.length; i++){
        newArray[i].date = new Date(docsInfo[i].date).toLocaleDateString();
        newArray[i].total = docsInfo[i].value;
        newArray[i].risks = docsRisk[i].value;
    }

    return ( 
        <Swiper
            className={sr.container}
            modules={[Navigation]}
            spaceBetween={0}
            {...isDesktop ? newArray.length > 8 ? {slidesPerView: 9} : {slidesPerView: newArray.length} : isMobile ? {slidesPerView: 1} : {slidesPerView: 9}}
            scrollbar={{ draggable: true }}
            navigation = {{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
            rewind = {true}
        >
            <div className={sr.button_next}></div>
            <span className="swiper-button-next" ></span>
            <div className={sr.button_prev}></div>
            <span className="swiper-button-prev" ></span>
            {newArray.map((item, index)=>
                <SwiperSlide className={sr.swiper_slide} key={index}>
                    <div className={sr.generalSummory_table_content}>
                        <p>{item.date}</p>
                        <p>{item.total}</p>
                        <p>{item.risks}</p>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default SliderResultPage;