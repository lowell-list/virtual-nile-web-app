import React from 'react';
import TintedLayeredImages from './TintedLayeredImages';
import nc_nile_background from '.././img/night_candle/nc_nile_background.jpg';
import nc_00_water_glow from '.././img/night_candle/nc_00_water_glow.png';
import nc_10_shadow_lit from '.././img/night_candle/nc_10_shadow_lit.png';
import nc_21_outer_flower_lit from '.././img/night_candle/nc_21_outer_flower_lit.png';
import nc_31_inner_flower_lit from '.././img/night_candle/nc_31_inner_flower_lit.png';
import nc_41_candle_lit from '.././img/night_candle/nc_41_candle_lit.png';
import nc_45_candle_flame from '.././img/night_candle/nc_45_candle_flame.png';
import nc_46_candle_glow from '.././img/night_candle/nc_46_candle_glow.png';
import nc_50_glow from '.././img/night_candle/nc_50_glow.png';
import nc_61_outer_flower_front_lit from '.././img/night_candle/nc_61_outer_flower_front_lit.png';

export default function NightLotusFlower(props)
{
  return (
    <TintedLayeredImages
      canvasStyle={{width: '100%'}}
      canvasWidth={750} canvasHeight={450}
      images={
        [
          {src: nc_nile_background},
          {src: nc_50_glow},
          {src: nc_00_water_glow},
          {src: nc_10_shadow_lit},
          {src: nc_21_outer_flower_lit, tint: props.colors.secondary},
          {src: nc_31_inner_flower_lit, tint: props.colors.primary},
          {src: nc_41_candle_lit},
          {src: nc_45_candle_flame},
          {src: nc_46_candle_glow},
          {src: nc_61_outer_flower_front_lit},
        ]
      }
    />
  );
}
