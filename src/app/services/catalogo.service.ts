import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Pantalon Vaquero Baggy',
      precio: 39.99,
      imagen: 'https://bustinsjeans.com/cdn/shop/files/BI2A5910_1f0d00ca-839a-4c78-bafc-64e11009eaa1_800x.jpg?v=1736346832',
      categoria: 'pantalones',
      ruta: 'pantalones'
    },
    {
      id: 2,
      nombre: 'Pantalon Negro Chandal',
      precio: 32.50,
      imagen: 'https://www.errea.com/media/catalog/product/R/2/R27P0L0Z.jpg?optimize=low&fit=bounds&height=&width=&canvas=:',
      categoria: 'pantalones',
      ruta: 'pantalones'
    },
    {
      id: 3,
      nombre: 'Pantalon corto vaquero',
      precio: 27.49,
      imagen: 'https://img.joomcdn.net/7ca3901904a6a8bfd5cdba28899b5de11ce8fd9c_original.jpeg',
      categoria: 'pantalones',
      ruta: '/src/app/pages/pantalones/pantalones.html'
    },
    {
      id: 4,
      nombre: 'Camiseta Floral Malva',
      precio: 24.99,
      imagen: 'https://www.monoymona.es/wp-content/uploads/sites/6/2021/01/camiseta-hombre-con-estampado-floral-Malva.jpg',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 5,
      nombre: 'Camiseta Azul Navy ',
      precio: 19.99,
      imagen: 'https://tascon.es/cdn/shop/files/REEF_BISMARKRF.S24.3RMEN0723-NAVY-1.jpg?v=1718381426&width=1100',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 6,
      nombre: 'Camiseta estampada Halloween',
      precio: 22.50,
      imagen: 'https://assets-polinesia.imgix.net/media/catalog/product/C/A/CAMISETA_CASUAL_Polinesia_CAMISETA_HALLOWEEN_HOMBRE_6325137417-831-1_29092025101045.jpg?auto=format&fit=max&w=1300&q=75',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 7,
      nombre: 'Chaqueta Azul Diablo North Face',
      precio: 150.00,
      imagen: 'https://www.botteroski.com/46890-medium_default/458336-chaqueta-de-plumas-the-north-face-diablo.jpg',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 8,
      nombre: 'Chaqueta Roja Deportiva',
      precio: 59.99,
      imagen: 'https://cdn.siroko.com/products/67c58e51dac0a/590/704/crop_center.jpg?v=1743160410',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 9,
      nombre: 'Chaqueta Cuero',
      precio: 109.99,
      imagen: 'https://store.hondacanarias.com/media/catalog/product/cache/2d3e303121a652959edd5ff74af5177b/2/3/233-7520022-54_1.jpg',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 10,
      nombre: 'Zapatillas Deportivas Negras',
      precio: 140,
      imagen: 'https://img.joomcdn.net/1a3b535c210b6b96c09493591c422dc11d9bbec4_original.jpeg',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 11,
      nombre: 'Zapatillas con Tacon Azules',
      precio: 69,
      imagen: 'https://luisatoledo.es/2469/zapatos-azules-tacon-ancho-eva.jpg',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 12,
      nombre: 'Crocs Negras',
      precio: 110,
      imagen: 'https://i5.walmartimages.com/asr/d15b955f-63ec-4cdc-aaa4-37b28807b81f.6856aa51ea991e5595d5396efb074517.jpeg',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 13,
      nombre: 'Gafas de sol',
      precio: 29.99,
      imagen: 'https://www.hawkersco.com/on/demandware.static/-/Sites-Master-Catalog-Sunglasses/default/dw2a0c821b/images/large/HONR21BBTP_L.jpg',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },
    {
      id: 14,
      nombre: 'Gorra Azul ',
      precio: 19.99,
      imagen: 'https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_771795_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },
    {
      id: 15,
      nombre: 'Collar duo plata',
      precio: 24.99,
      imagen: 'https://singularu.com/cdn/shop/products/WCHLS0A925P00XX_2_puesta_1e23626a-e76d-48d5-a222-eb7ecff3333b.jpg?v=1669027488&width=3000',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },
    {
      id: 16,
      nombre: 'Pulsera Cuero',
      precio: 5.99,
      imagen: 'https://static.zara.net/assets/public/f412/b1fc/d8d14f3ebe38/f53e8e48b72f/05717400800-e1/05717400800-e1.jpg?ts=1747994425924&w=352',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },
    {
      id: 17,
      nombre: 'Camisteta Dior Amarilla',
      precio: 50.00,
      imagen: 'https://diorama.dam-broadcast.com/cdn-cgi/image/width=3000,format=auto/pm_11872_1238_1238598-dtr6cax6vj-whr.jpg',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 18,
      nombre: 'Abrigo Pelo Largo',
      precio: 79.99,
      imagen: 'https://www.bolf.es/hpeciai/d7cdd685aebdd46e3fcfc158d18a6b9e/spa_pl_Abrigo-forrado-largo-de-invierno-para-mujer-camel-Bolf-AN105-87340_16.jpg',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 19,
      nombre: 'Zapatillas Adidas Campus',
      precio: 110.99,
      imagen: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSdbH_VF8sehHsThCYWq7VgbxrTKg6je5ylBwghj1CplBWseNc4TfTVHirmO4PSsp4He6A-dREw9knzT-xETAbNjlCmXxiEcwjvOWM579cuDSdn2-oo2nl0MnI_7SqQ3A37kLAu88t5nfc&usqp=CAc',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 20,
      nombre: 'Camiseta Navideña',
      precio: 22.99,
      imagen: 'https://jerseynavideno.com/cdn/shop/products/Camiseta-Navidena-Merry-Christmas-Pinguino.jpg?crop=region&crop_height=1000&crop_left=100&crop_top=0&crop_width=800&v=1725447491&width=1000',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 21,
      nombre: 'Camiseta Torreznos',
      precio: 30.00,
      imagen: 'https://cdn-ileglgb.nitrocdn.com/DyoxkJBdoPZveiwtEbqoEJPbXrLxuiVh/assets/images/optimized/rev-e37012b/ganafote.com/wp-content/uploads/2025/12/area112.png',
      categoria: 'camisetas',
      ruta: 'camisetas'
    },
    {
      id: 22,
      nombre: 'Chaqueta Azul Elegante',
      precio: 85.00,
      imagen: 'https://delaespriellastyle.com/media/catalog/product/cache/7a3ea6ca3d1f7e49ca627023822d1a6b/f/a/fa070010-1_1.jpg',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 23,
      nombre: 'Chaqueta Invierno',
      precio: 40.00,
      imagen: 'https://pix.bonprix.es/imgc/0/0/2/5/1/2/1/2/4/5/_235/25121245/chaqueta-de-invierno-con-capucha-y-detalles-de-piel-sintetica.jpg',
      categoria: 'chaquetas',
      ruta: 'chaquetas'
    },
    {
      id: 24,
      nombre: 'Sandalias Azules Adidas',
      precio: 40.00,
      imagen: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQpdeqX85mxi_-25R1MKt8aYLunTtOlRxmOJdwglLsmFLK6dUZXd1B_1equNvj_kqLnCuxUO5PQIdlMHm-MharxxW-m2pJTh0u1HfPPKTP4hBgXiiUg4QohNHarXMFuMQXkHM4KIH_i77s&usqp=CAc',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 25,
      nombre: 'Botas Cuero Negras',
      precio: 54.00,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRuF1YoyyJbCmf2kN-QzwPgibQwZeyii93A&s',
      categoria: 'zapatos',
      ruta: 'zapatos'
    },
    {
      id: 26,
      nombre: 'Pendientes de Novia',
      precio: 25.99,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33wr3h_Wo3Yk8LeJAtM2pUrCVKgwyo-e79g&s',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },
    {
      id: 27,
      nombre: 'Sombrero Azul',
      precio: 17.99,
      imagen: 'https://www.tuskamisetas.com/resources/images/046_69_250_m-2025_02.jpg',
      categoria: 'accesorios',
      ruta: 'accesorios'
    },


  ];

  getProductos(): Producto[] {
    return this.productos;
  }
}
