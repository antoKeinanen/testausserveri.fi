"use client";

import styles from './PostFeatured3D.module.scss'
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Capsule } from '../Capsule/Capsule';
import { HiOutlineCubeTransparent } from 'react-icons/hi'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Image from 'next/image';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

export function PostFeatured3D({splineURL, placeholderBlurDataURL, placeholderSrc}: {splineURL: string, placeholderBlurDataURL: string, placeholderSrc: string}) {
    const [splineLoading, setSplineLoading] = useState(true)

    const tipCapsule = useRef<HTMLSpanElement>(null)
    const [tipTimeout, setTipTimeout] = useState<NodeJS.Timeout | number | undefined>(0)
    let previousTimeout: NodeJS.Timeout | number | undefined = undefined

    return (
        <div className={`${styles.postFeatured3D} 
        ${splineLoading ? styles.loading : styles.loaded} ${(typeof tipTimeout === "number" && tipTimeout > 0) ? styles.tipVisible : ""}`} style={{marginRight: "70px", marginBottom: "20px"}}>
            <Image
                className={styles.placeholder}
                fill={true} 
                placeholder='blur' 
                blurDataURL={placeholderBlurDataURL}
                src={placeholderSrc}
                sizes="(max-width: 800px) 100vw, 70vw"
                alt="Artikkelin kuva" />
            <div className={styles.splineWrapper}>
                <Spline
                    scene={splineURL}
                    onLoad={() => {
                        console.log("Spline loaded")
                        setTimeout(() => {
                            setSplineLoading(false)
                        }, 1000);
                    }}
                />
            </div>
            <Capsule className={styles.tip} ref={tipCapsule} />
            <Tooltip id="rotate-3d-tooltip">Voit pyörittää 3D-mallia raahaamalla hiirtä!</Tooltip>
            <span className={styles.cube} data-tooltip-id="rotate-3d-tooltip">
                <HiOutlineCubeTransparent />
            </span>
        </div>
    )
}
