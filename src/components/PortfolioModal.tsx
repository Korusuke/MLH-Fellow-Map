import React, { createRef, useEffect, useRef, useState } from 'react';
import { Container } from 'reactstrap';
function PortfolioModal() {
  const [open, setOpen] = useState(false);
  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!modalRef.current) return;
    const style = modalRef.current.style;
    if (open) {
      style.minHeight = '70vh';
      style.height = 'min-content';
      style.overflowY = 'visible';
      style.top = '30vh';
    } else {
      style.top = (null as unknown) as string;

      setTimeout(() => {
        style.minHeight = (null as unknown) as string;
        style.overflowY = (null as unknown) as string;
        style.height = (null as unknown) as string;
      }, 300);
    }
  }, [open, modalRef.current]);

  return (
    <div className="portfolio-modal" ref={modalRef}>
      <img
        className="profile-image"
        src="/images/willr.jpg"
        alt="profile pic"
      />
      <Container>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at
          eaque enim iusto labore laborum quasi soluta. Atque eius est fugiat
          ipsam iusto necessitatibus obcaecati officiis, perspiciatis quidem
          repellendus ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus,
          amet assumenda atque blanditiis culpa debitis dicta, ea eaque est
          explicabo itaque magnam magni modi neque nihil nisi nobis porro quasi,
          quia quo quod repellat repudiandae veritatis voluptate! Corporis ea
          eligendi facere. Neque quibusdam, vitae! Ab accusantium ad amet
          assumenda autem consequatur deserunt dignissimos doloribus eaque earum
          ex facere iste laudantium maxime officia, officiis perferendis quam
          quia rem repudiandae sapiente sequi sint sit ullam ut voluptatibus
          voluptatum? Alias consequuntur culpa earum eum ex, in ipsam magnam
          magni neque nostrum obcaecati perferendis quae recusandae saepe
          similique ullam voluptas. Ex, suscipit, vero.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          exercitationem, fugiat minima nisi quia reiciendis voluptate! Adipisci
          eaque mollitia, nihil optio provident quaerat reiciendis tempora vel!
          Alias asperiores autem beatae commodi consequuntur debitis eius
          exercitationem facilis ipsa ipsum itaque, iure laboriosam, libero
          maiores, praesentium quaerat quibusdam quis ratione reiciendis
          repellat sapiente similique tenetur ut vero voluptatem. Ad alias
          asperiores atque corporis cum eius error est ex iusto laborum,
          molestiae natus, perferendis perspiciatis qui quos saepe temporibus?
          Ab corporis dolores eos eveniet facere fuga iusto molestiae officia.
          Ab alias aliquid assumenda atque corporis culpa cupiditate dolor
          dolorem ducimus enim esse est eveniet exercitationem in incidunt
          laudantium molestiae, nam nemo numquam perferendis praesentium
          provident quaerat quam qui quibusdam quis quos ratione reprehenderit
          sapiente sint soluta sunt ut, voluptate. Accusantium aspernatur eius
          incidunt soluta. Accusamus aliquam aperiam architecto consectetur
          culpa dolore ducimus eaque est exercitationem, in ipsa maxime neque
          quae quas quod reiciendis repellendus repudiandae saepe suscipit unde
          ut vitae, voluptas! Adipisci at consectetur delectus ducimus et omnis
          quam quod recusandae reprehenderit veritatis. Autem beatae cupiditate,
          dolore eum expedita minus sapiente sed! Assumenda impedit labore nemo
          odio repellendus! Adipisci asperiores atque beatae corporis delectus
          eaque facere id modi necessitatibus neque nisi, nostrum, numquam
          obcaecati odio odit, officia omnis pariatur quaerat ratione similique
          unde veritatis vitae voluptate? Dolore officiis perferendis sunt
          voluptas! Accusamus eius harum illum. Animi aut dolorem ea eligendi
          enim et excepturi facere, praesentium reiciendis reprehenderit. Alias
          aliquam dolorem eos, libero neque non odit perspiciatis possimus quasi
          quisquam sed suscipit vel voluptas? Animi fugit illum nisi pariatur
          possimus qui, voluptas! Asperiores consectetur cum, eligendi nemo
          officiis tenetur voluptatem. Accusantium aliquid amet aut consectetur
          consequatur corporis, cum cumque debitis deleniti deserunt doloribus
          ducimus eius enim eos et ex fuga laudantium libero minus nesciunt
          obcaecati pariatur quidem ratione rem repudiandae, sed tempore unde
          veniam vitae voluptate? Ad animi consectetur doloribus dolorum fugit
          ratione sint vel. Ad animi beatae consectetur culpa debitis delectus
          dolorem doloremque doloribus dolorum eius illo impedit inventore ipsam
          ipsum molestiae molestias mollitia, officiis pariatur placeat quae
          quasi recusandae sed sint totam veniam, voluptatem voluptatibus.
          Aperiam delectus dolorum eligendi error id, illo magni nostrum. Quos,
          tempore, voluptatibus. A aliquid at doloribus perspiciatis repellendus
          rerum sed, totam! Accusantium adipisci aliquam autem beatae cupiditate
          deleniti dicta dolore ducimus earum eius enim impedit, laborum modi
          nihil officiis quae quam quis reiciendis saepe similique sit
          temporibus tenetur veritatis. Accusamus adipisci aliquid commodi
          dolores et fuga inventore iste natus obcaecati pariatur perspiciatis
          quaerat quidem quisquam sapiente sint soluta temporibus vel, vitae.
          Aliquam aperiam dolor, earum esse et ipsam magni numquam qui quo sunt
          unde vero. Consequatur dolores enim eos explicabo facere iste itaque
          laudantium maxime, placeat quod repudiandae sint ullam, vel voluptas
          voluptatibus? Ab dolor hic, impedit inventore iste nihil porro tempore
          voluptatibus. Accusantium alias fuga ipsa, ipsum minus mollitia non
          repellat sequi totam vel. Aperiam architecto at consequatur dicta
          doloribus error laboriosam nostrum omnis tempora voluptate? Dolores ea
          enim illo laudantium molestiae quo sapiente voluptas! Labore,
          laboriosam officiis. Alias aperiam aspernatur commodi consequatur
          cumque delectus dicta dolore dolores doloribus fugit, laboriosam magni
          neque officiis perferendis porro praesentium quis reprehenderit saepe
          similique velit. A ab, asperiores beatae corporis deserunt ducimus eos
          facere impedit ipsam, iusto laborum maiores minus necessitatibus odit
          quaerat reprehenderit tempore unde velit veritatis voluptatum.
          Adipisci autem doloremque labore maxime quibusdam. Architecto culpa
          fuga impedit in itaque qui repellendus totam. A ab accusantium ad
          adipisci at autem blanditiis commodi consequatur distinctio dolor
          dolores ea, est exercitationem fuga itaque modi nemo nesciunt nobis,
          numquam porro possimus praesentium provident quas qui quia quibusdam
          vel voluptatum? Ab consectetur dignissimos dolores error explicabo
          fugiat, illo illum in ipsum iste iure nemo omnis praesentium quasi
          quis reiciendis sunt. Accusantium aspernatur facilis ipsa sed. At ea
          excepturi, explicabo id maiores perspiciatis rem. Aliquid architecto,
          aspernatur atque blanditiis enim ex facilis fugit illum laborum magni
          modi nisi nulla porro quae quam quasi, ratione repudiandae rerum
          tenetur voluptates. Animi aperiam blanditiis debitis dolore ex
          incidunt natus nemo non. Aspernatur dignissimos dolores, eaque eum,
          expedita fugiat hic, illo ipsam laboriosam maiores minima minus
          molestias necessitatibus odio odit quidem voluptatum? Accusantium
          aliquid animi dolore doloremque dolores excepturi, in iste laboriosam
          maiores molestias mollitia possimus quae quo ratione, repellat
          sapiente sunt. Aliquid asperiores cumque debitis delectus dolore
          ducimus eaque, error esse eum facere, harum ipsam molestias neque nisi
          officia quae quia quo sed suscipit voluptatibus. A, asperiores
          consequatur, corporis dolorem fugit iste labore nam omnis perferendis
          praesentium quaerat quam vitae? Accusantium aliquid consequatur facere
          illum nihil nisi odio officia provident sequi, similique! Aliquid
          animi aspernatur autem consequatur dolorum, necessitatibus sapiente
          similique? Asperiores commodi enim excepturi, exercitationem fugit hic
          impedit ipsum iste nobis odit officia placeat porro praesentium quam
          ratione rerum, sapiente suscipit totam voluptatibus voluptatum. Alias
          atque blanditiis impedit ipsam odit saepe sed ut voluptas. Accusamus
          aliquam architecto consectetur corporis debitis error ex id magni.
          Esse molestias nam non quia saepe. Mollitia, placeat praesentium
          repellendus soluta temporibus tenetur vero? Consequatur dicta fugiat
          labore laboriosam quidem tempore. Accusamus alias aperiam aspernatur
          at deserunt dicta dolore doloremque dolorum, ea earum fuga fugiat
          harum illo in ipsa iste iusto libero magnam maxime modi nisi, officiis
          optio pariatur possimus quidem quis reprehenderit rerum sapiente sed
          sit sunt tempora tempore ullam. Accusamus aperiam consequuntur cum
          delectus deleniti deserunt dicta dolores eaque in molestias nam non
          odit officiis possimus quibusdam quis, rem repellat totam. Delectus
          deserunt et iste molestiae neque quis quisquam quos unde? Commodi
          dignissimos et, eveniet facere in iusto nam non praesentium recusandae
          sapiente, vero voluptates! Consequuntur debitis ea eum ipsum iure
          molestiae placeat similique totam vel voluptatem. Adipisci architecto
          assumenda consequuntur corporis deserunt dignissimos distinctio
          dolorum expedita explicabo fugit, harum ipsam laudantium mollitia nam
          placeat possimus quo quod ratione sequi soluta suscipit tempora
          temporibus tenetur totam ullam. Corporis deserunt eius ipsam
          laboriosam minus nam nemo, nisi odit repudiandae soluta! Adipisci
          atque eos iure laboriosam magnam magni perspiciatis, quo sed
          temporibus voluptas. A adipisci amet aspernatur autem beatae deleniti
          doloribus earum enim esse exercitationem iure natus, sit temporibus
          ullam vero voluptas voluptatibus voluptatum. Aspernatur iure nemo
          numquam quibusdam? Laboriosam, quia!
        </p>
      </Container>
    </div>
  );
}

export default PortfolioModal;
