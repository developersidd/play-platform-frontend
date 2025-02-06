import { getUserHistory } from "@/api/user.api";
import moment from "moment";
import HistorySettings from "./_components/HistorySettings";
import HistoryVideoCard from "./_components/HistoryVideoCard";

const HistoryPage = async ({ searchParams: { search } }) => {
  const userHistory = await getUserHistory(search);
  console.log("userHistory:", JSON.stringify(userHistory, null, 2));

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 py-4 md:py-6 xl:py-8">
      <h1 className="text-2xl font-bold mb-8">Watch history</h1>
      <div className="flex items-start justify-between ">
        <div className="w-full lg:w-2/3">
          {userHistory?.data?.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <h1 className="text-xl">
                {" "}
                {search ? "No results found" : "No history found"}{" "}
              </h1>
            </div>
          ) : (
            userHistory?.data?.map(({ videos, _id } = {}) => {
              const date = moment(_id);
              const today = moment();
              const daysAgo = today.diff(date, "days");
              const formattedDate =
                daysAgo <= 7
                  ? date.format(
                      "dddd"
                    ) /* dddd -> means show the full day name */
                  : date.format(
                      "MMM D, YYYY"
                    ); /*  (MMM D, YYYY) means -> show 3 chars of the month,  day with number and the full year */
              return (
                <div key={_id} className="mb-12">
                  <h1 className="mb-4 text-xl font-bold"> {formattedDate} </h1>
                  <div className="space-y-6">
                    {videos.map(
                      ({ video }) =>
                        video?._id && (
                          <HistoryVideoCard key={video?._id} video={video} />
                        )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <HistorySettings />
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nihil
      possimus dolor veritatis illum ad praesentium explicabo nulla, suscipit
      officia quaerat non autem voluptatem eum deleniti, at aspernatur animi!
      Pariatur maxime tempora unde? Minus praesentium vel dolor officia
      dignissimos, aliquid deserunt labore voluptatibus aliquam itaque,
      obcaecati consequatur? Fuga ut unde tenetur quibusdam quam beatae omnis
      sunt officiis sed asperiores debitis ullam voluptatum optio nostrum,
      provident alias iste ex molestiae, aspernatur autem blanditiis
      voluptatibus nesciunt ipsum magnam. Debitis doloribus quisquam itaque?
      Magni vero quam ex, eius, nesciunt reprehenderit nam sit odio voluptate
      nihil provident rerum molestiae quis impedit quos, neque incidunt
      aspernatur illo distinctio doloremque! Soluta, eum molestiae delectus
      voluptatum ipsum hic. Est, perferendis! Neque sint fuga consectetur rem
      iste optio modi, omnis ipsa qui nam illo ipsum velit esse! Quia quas nemo
      iure quae repellendus nobis laudantium laborum! Odio labore repellat
      voluptates earum tempora perferendis aut, dignissimos ea deserunt vero est
      delectus, eveniet eos iure, molestias velit facilis fugiat quisquam omnis!
      Quam rerum dicta dolores architecto dolore hic sequi labore neque
      cupiditate dolor. Illum assumenda magni non ipsam ut quam sapiente eaque
      labore explicabo corporis temporibus ullam maiores aliquam, tempora
      mollitia laborum doloremque est distinctio. Facere recusandae facilis
      eveniet exercitationem esse quisquam incidunt, harum doloribus voluptatem
      reiciendis, magni hic nesciunt eligendi ab? Fugit voluptatum minus
      recusandae maxime at dolorum inventore, dicta quibusdam? Neque ipsam
      quibusdam itaque veritatis expedita, pariatur odit. Laboriosam labore
      aliquam numquam possimus minus esse dolorem tenetur ut quia, ratione
      exercitationem officiis cumque reiciendis a sapiente temporibus in illo
      nostrum pariatur, sit facilis. Magni autem, dicta explicabo recusandae
      maiores esse distinctio veritatis quia, nam dolorum iusto quam quas
      deserunt ut praesentium molestias dolorem, itaque vero? Officiis incidunt
      error odit sint quas molestiae molestias quisquam, architecto harum labore
      ex totam! Accusamus, incidunt ullam minus magnam provident sequi obcaecati
      quasi. Sed tempore cum corporis alias fuga blanditiis, amet obcaecati
      recusandae perspiciatis praesentium velit consequatur eaque, dolorum
      maxime numquam enim necessitatibus excepturi! Veniam labore soluta
      deleniti, eos pariatur sint officia, nobis nostrum ratione laboriosam eum
      laudantium repellat molestiae! Perspiciatis, incidunt nostrum et veritatis
      odio nulla illo reprehenderit distinctio quos, culpa ex autem quis
      provident ipsum accusantium reiciendis, recusandae dignissimos! Officia
      veniam unde itaque laudantium, ex nihil? Saepe sint cum odit
      necessitatibus est dolorem unde, libero quaerat nihil maxime cupiditate
      rerum autem perspiciatis mollitia iste? Excepturi similique a laborum
      incidunt quas optio dolor maxime, quisquam explicabo fugiat rerum facere
      voluptate blanditiis ullam. Optio facilis quibusdam minus fugiat. Saepe
      tempore placeat aliquam aperiam voluptatibus minima animi ratione,
      perferendis, sint dignissimos porro quis veritatis harum vel!
      Necessitatibus, quibusdam voluptatum autem sint explicabo beatae labore
      cumque perspiciatis ullam modi fugit aspernatur unde qui earum, minus id.
      Provident excepturi dolor amet qui magnam consequatur architecto quos
      porro expedita molestias. Vel id sequi porro possimus fugiat harum facere
      ducimus ratione dolorum, omnis, recusandae autem repudiandae accusantium
      laboriosam praesentium ullam deserunt ipsum quos odit esse dolore quo
      asperiores eaque. Tempore voluptates, ipsam illum delectus, reprehenderit
      sint velit perferendis unde quasi quaerat laboriosam officia iste nesciunt
      nam suscipit aut saepe. Quae minus dignissimos delectus deserunt odit
      deleniti nisi distinctio ipsa esse! Esse, nesciunt ducimus id nam deserunt
      voluptate aut. Blanditiis excepturi fuga eius nostrum officia corporis
      doloremque dignissimos dolore quidem. Laboriosam recusandae distinctio
      aperiam culpa fugiat nulla error, pariatur laborum doloremque nemo ipsa,
      harum molestias, veniam nobis libero corporis! Inventore quia nemo
      tempore. Ducimus esse mollitia exercitationem labore sed, dolorum deserunt
      numquam! Corporis rerum facilis nihil a culpa, aut veniam eum consequuntur
      odio accusamus! Quisquam enim maiores, corrupti accusantium explicabo iste
      minus consequuntur laborum libero atque ad molestiae omnis itaque porro,
      voluptate quis illo suscipit. Deserunt magni harum ab excepturi. In, odio
      iste. Explicabo, aliquam asperiores! Optio modi, cumque aliquam, illo
      possimus fugiat est, officia animi sit sapiente dolorum deserunt unde
      beatae in accusamus totam? Aut modi distinctio voluptates itaque omnis
      tenetur, dignissimos et neque nesciunt numquam, nemo corrupti deserunt.
      Repellat exercitationem ipsa quibusdam similique tempore quia corporis
      eum, inventore distinctio explicabo alias dolore, dolores debitis,
      cupiditate nihil labore ipsam reprehenderit nobis? Voluptates natus libero
      non maiores necessitatibus sed voluptatum, accusamus nemo ad ducimus iusto
      dolore quam enim illum accusantium incidunt laborum saepe sequi eius?
      Molestias velit illo magnam doloremque unde doloribus quis commodi,
      voluptatum aliquam in quisquam quam aperiam asperiores qui autem nam
      saepe! Deleniti eum hic doloribus maiores quia rem. Possimus quidem amet
      eos earum consectetur mollitia nisi eveniet, error nostrum sequi non?
      Nesciunt quia assumenda qui quos. Vel, dicta? Ea sit ducimus nobis natus
      dolore, aliquid accusantium quidem delectus assumenda nemo voluptates vel
      praesentium fuga alias molestiae culpa maiores aspernatur, quasi
      cupiditate numquam ullam. Nisi illo aperiam earum repudiandae adipisci
      temporibus itaque, non fugit aut voluptas dignissimos libero consequatur
      vel voluptate minima autem error velit sit consequuntur perferendis, nam
      sed! Ea et similique voluptatum fugiat delectus aperiam aspernatur
      recusandae dolore sint quia id voluptatibus vel magni quisquam vitae
      pariatur ullam, voluptas impedit. Excepturi fugit sequi magni? Excepturi
      perferendis beatae atque voluptates. Neque officia deserunt tempore optio
      reiciendis veritatis fugit quo eligendi suscipit, ratione laboriosam
      explicabo unde numquam assumenda sunt quisquam perferendis quae recusandae
      natus aliquam fugiat ullam est commodi? Aut ullam iste in beatae, fugiat
      nesciunt porro hic, animi voluptatum praesentium eaque modi, veniam nihil
      vitae sint exercitationem id aliquid soluta officiis. Iste quibusdam, non
      inventore fugiat praesentium voluptas deleniti alias veritatis aperiam
      nemo? Cumque accusantium consectetur placeat vitae, omnis ea earum dolorem
      vero eos veniam corrupti repudiandae id harum laudantium repellendus
      labore et, voluptas inventore, magni magnam. Quam nesciunt pariatur minus
      velit consectetur aliquam eaque alias ullam eius sint asperiores porro
      iure, nihil quae veritatis, mollitia optio incidunt assumenda, dolorem id
      non. Alias, dicta veritatis! Aut ratione atque vitae labore facere
      recusandae suscipit hic necessitatibus aliquam quis tenetur mollitia at
      enim quisquam eius, iste eveniet corrupti repellendus veniam impedit
      quidem quae aliquid! Accusamus iste, corporis dolorem dignissimos eius
      provident illo. Veritatis facere tenetur fuga ullam repudiandae quam vitae
      omnis error. Eos veritatis aut itaque iste minima voluptatibus natus animi
      dolorum, vitae quo asperiores suscipit obcaecati numquam, minus nam
      aspernatur mollitia tenetur cum vel quis. Possimus eligendi temporibus,
      officia veritatis id natus dignissimos voluptatum nisi maiores illum iste
      odit ipsam? Itaque voluptas provident natus. Exercitationem perspiciatis
      ipsam voluptate, architecto illum doloribus quisquam, tempore corrupti
      dignissimos magni quo? Cum eius quasi id illo harum! Necessitatibus
      voluptatum fuga ab explicabo nobis maiores facilis in aliquam architecto,
      quae expedita hic qui repellendus magnam, harum delectus officia rem? Ut,
      qui! Qui quam repellat quae! Enim totam eveniet eum expedita veritatis
      quia magnam odit aspernatur, voluptate velit saepe dolor a adipisci
      doloribus modi voluptatibus corporis nihil blanditiis dicta labore? Quis
      itaque, quaerat nostrum laboriosam ea error sit. Officiis voluptas fugiat
      consequatur minus debitis quo facilis, in eos veniam dicta minima,
      expedita vel. Quas facilis dignissimos fugiat. Rem ut recusandae
      laboriosam impedit, delectus, reprehenderit odio inventore nobis nam
      praesentium temporibus. Sunt voluptatem reprehenderit iure repudiandae,
      suscipit autem sequi a, aspernatur ullam veritatis natus in doloremque
      alias obcaecati perferendis ea ab. Vel sit qui, expedita minus suscipit
      inventore dolores beatae voluptatibus minima labore omnis quod dolorum
      repellendus iure aliquid libero at iste debitis. Ratione facilis aliquid
      reiciendis omnis libero id doloremque incidunt odit! Labore quis animi
      consequuntur repudiandae porro exercitationem minus enim voluptatibus
      sint. Quisquam, ullam? Ipsam eum aut sed ad atque, delectus dolorem ea
      explicabo vel provident sunt placeat magnam non pariatur accusantium
      consequuntur officiis. Omnis iste suscipit neque, quam saepe rerum
      molestias odio repellat consectetur, quae sit libero minus numquam soluta
      adipisci voluptatibus a, nisi temporibus alias deserunt! Dolore nam
      cumque, esse eveniet necessitatibus quisquam obcaecati quis et. Impedit
      rerum, ratione dolores distinctio blanditiis debitis et eligendi itaque
      eveniet laborum unde cum labore culpa nemo doloremque iusto laudantium
      recusandae deleniti omnis minus quod minima? Porro consequuntur earum
      veniam molestiae. Aspernatur, eum asperiores necessitatibus neque
      voluptate quod quia odio reiciendis est blanditiis expedita labore
      veritatis, dicta velit vero repellendus sapiente et praesentium ipsam id!
      Nisi ratione vel, enim quas perspiciatis, aut praesentium sunt qui
      delectus sint labore voluptatem? Inventore ipsum alias maxime nesciunt
      deleniti sit, voluptas ab doloremque, minima architecto repudiandae harum.
      Reiciendis eum molestias hic, impedit quibusdam neque dolores laudantium
      consequatur fugit delectus? Sed nobis provident eos, eveniet officiis
      maxime, voluptatum sapiente ea, expedita ex iste ab culpa numquam
      laudantium corporis odio dicta autem asperiores quis? Eligendi tenetur
      aliquid optio repellendus dolores nulla at soluta tempore nostrum debitis
      beatae veniam adipisci ea quos aut, quasi cum. Excepturi impedit amet,
      commodi illo corrupti inventore modi adipisci iste ullam sint sunt eos
      iusto vel consequatur nam officia cum voluptatem sit. Culpa sit nesciunt
      ut sequi mollitia autem beatae, perspiciatis repellendus sunt vitae, enim
      impedit quidem nulla, ullam ex explicabo porro ipsa distinctio. Quidem
      quisquam nemo optio facere quas eum sequi tempore vero fuga ipsum dolores
      recusandae, nesciunt quasi. Repellendus animi optio incidunt ipsum
      temporibus rem assumenda soluta quas explicabo, sed voluptatum voluptates
      repudiandae. Blanditiis enim cumque sit modi, a minus! Saepe veniam
      similique adipisci obcaecati magnam voluptate, enim, nulla ex porro,
      debitis rem facere cum sapiente. Neque culpa aspernatur impedit deleniti
      esse inventore, quam minus a, error ipsam natus aperiam explicabo iure
      incidunt! Dignissimos minus dolorum quos eius optio autem dolores
      consequatur magni molestias fugit sapiente explicabo velit pariatur atque,
      blanditiis suscipit culpa voluptatem repudiandae! Recusandae, veritatis
      similique voluptatem a voluptas saepe iste excepturi enim possimus ea
      dolor reprehenderit dicta ad porro est magnam! Modi nihil dicta amet
      repudiandae explicabo dolorum perferendis quisquam temporibus cum labore
      quo autem, enim tenetur inventore reprehenderit nostrum, sequi nulla iure,
      minima a maxime quas impedit totam. Facere officiis beatae voluptas omnis
      animi dicta, nostrum maiores quia harum laborum voluptatibus, dolorum
      tempore? Autem saepe odio voluptate ipsam rerum dolor harum ex assumenda,
      a, architecto recusandae accusantium, nostrum quos provident! Id facere
      adipisci voluptate pariatur? Pariatur exercitationem commodi repellat
      ipsum voluptas laborum architecto provident, nesciunt, aut omnis labore
      voluptatem aspernatur est aliquam autem at iusto enim maxime sint
      doloremque cum. Aut quaerat omnis deleniti, error, doloremque animi
      cupiditate, mollitia impedit possimus explicabo dolore nulla ea alias amet
      sunt unde quisquam laudantium et maiores reiciendis labore. Illum
      doloribus veritatis perspiciatis sequi recusandae vel. Numquam ea
      consequuntur quidem. Illo iste similique consectetur sunt, sit veniam
      voluptates nihil ratione eos sapiente repellat, exercitationem non? Nihil
      atque, odit aperiam quidem aliquam hic alias repudiandae consectetur,
      laboriosam quod placeat delectus, perferendis veniam doloribus at
      voluptates. Dolorum autem corporis reiciendis dolorem accusantium at
      nesciunt saepe magni iste! In iure labore maxime! Voluptate quae
      exercitationem qui earum sapiente in totam. Odit velit vel temporibus
      illum ad, nihil, alias pariatur, beatae cum sit sed id rem ab recusandae
      deserunt quam doloribus perferendis eaque inventore? Iusto dolor quaerat
      dolores doloribus vel iure blanditiis accusantium! Perspiciatis ad
      mollitia quia ab ipsa commodi fugit, praesentium cupiditate placeat atque
      velit quos odio nemo sapiente eum ipsam saepe similique. Nihil nam odit
      eos et, ullam ea rem autem corrupti laboriosam sit illum! Assumenda
      accusamus nisi reprehenderit iure, similique recusandae quibusdam repellat
      sequi beatae itaque facere harum ratione obcaecati? Distinctio temporibus
      inventore maxime veritatis, impedit voluptas vel, illo nostrum voluptates
      quasi nesciunt, a explicabo. Fugiat laudantium vero enim non excepturi
      quis sint. Nisi voluptatum beatae illum aspernatur adipisci repudiandae
      provident, minus temporibus voluptas unde, exercitationem ipsam. Ducimus
      quis adipisci ipsum repudiandae voluptas reiciendis ex. Sed maxime enim
      nihil distinctio excepturi? Adipisci, sunt ipsa? Quaerat ducimus cum
      dolore quae odio voluptatibus suscipit eius blanditiis voluptatem,
      consequatur eaque distinctio voluptatum sed iusto delectus laudantium
      temporibus? Fugiat, aliquid natus, voluptates quae eos libero accusamus
      qui deleniti quo dolore mollitia, fugit facilis quasi nemo minima? Rem
      quibusdam eius eos mollitia fugiat velit commodi, cumque exercitationem
      possimus placeat asperiores, molestias quas autem voluptatibus! Mollitia
      tenetur distinctio porro atque, est iste nam ullam placeat vel? Vero
      repellendus, sed, sunt suscipit cupiditate voluptate natus laudantium odit
      et, ullam porro impedit aliquam mollitia saepe similique non aspernatur
      dolorum. Ut sit quasi ea, veniam voluptatum necessitatibus adipisci totam
      nam hic maxime impedit quas quidem aliquid minima itaque molestiae labore,
      explicabo, suscipit fugiat quisquam ab sunt? Rem numquam aperiam
      architecto dolor non repudiandae reiciendis! Quam fugit quas at autem
      pariatur aliquam velit dolores est, fugiat assumenda sed aspernatur
      quaerat aut voluptates iusto maxime.
    </div>
  );
};

export default HistoryPage;
