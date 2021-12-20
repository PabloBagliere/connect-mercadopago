import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import image1 from '../../public/1_500x500.jpg';
import styles from '../../styles/Producto.module.css';

const Producto: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Producto de prueba</title>
        <meta name="description" content="Producto histrix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Prueba de MercadoPago - MundoIt</h1>
        <div className={styles.grid}>
          {[...Array(10)].map((x, i) => 
          <div className={styles.card} key={i}>
            <Image  src={image1} alt= {`Imagen de prueba ${i}`} />
            <footer className={styles.footerCard}>
              <div className={styles.actions}>
                <Link href={`/checkout/${i}`}>
                  <a className={styles.button}>Comprar</a>
                </Link>
                <span className={styles.price}>$ 1.500</span>
              </div>
              <h4>Descripcion</h4>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, maiores?
              Quae voluptas nihil, fugiat assumenda neque aliquam ipsa quam iste
              tempora nisi laboriosam doloribus cum pariatur quos repellat. Ducimus,
              dolorum!
            </footer>
          </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://www.mundoit.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MundoIt - Histrix
        </a>
      </footer>
    </div>
  );
};

export default Producto;
