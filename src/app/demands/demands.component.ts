import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demands',
  imports: [CommonModule],
  templateUrl: './demands.component.html',
  styleUrl: './demands.component.css'
})
export class DemandsComponent {
  accordionItems = [
    {
      title: '1. Objava cele dokumentacije koja se tiče rekonstruisanja železničke stanice u Novom Sadu koja je trenutno nedostupna javnosti',
      content: 'Studenti su zahtevali da se objavi kompletna dokumentacija u vezi sa rekonstrukcijom Železničke stanice u Novom Sadu. Prvobitni odgovor na ovako postavljen zahtev bio je da dokumentacijom raspolaže samo Tužilaštvo, da bi ubrzo nakon toga ona bila nepotpuno objavljena od strane drugih državnih organa. Naše kolege sa tehničkih fakulteta, kao i sa Udruženja arhitekata Srbije, uočile su da u objavljenim dokumentima nedostaje ključna dokumentacija neophodna za utvrđivanje krivične odgovornosti lica koja su rukovodila rekonstrukcijom Železničke stanice i bila na njoj angažovana. Konkretno nedostaju ugovori koji pokazuju ko je šta radio na Železničkoj stanici i koliko je to koštalo, zašto je cena rekonstrukcije skočila pet puta, kao i ko je odgovoran što je Železnička stanica dva puta svečano otvarana bez upotrebne dozvole.',
      isOpen: false
    },
    {
      title: '2. Zahtevamo potvrdu nadležnih organa o identitetu svih lica za koja postoji osnovana sumnja da su fizički napala studente i profesore, kao i pokretanje krivičnih postupaka protiv njih. Takođe zahtevamo razrešenje pomenutih lica ukoliko se pokaže da su ista javni funkcioneri.',
      content: ' Zbog neažurnosti MUP-a u pogledu navedenog zahteva, redovni profesor i dekan Fakulteta dramskih umetnosti (FDU) je 2.12.2024. u ime fakulteta podneo krivičnu prijavu Trećem osnovnom javnom tužilaštvu. Podneta krivična prijava se odnosi na lica za koja postoji osnovana sumnja da su dana 22.11.2024. fizički nasrnula na studente i profesore pomenutog fakulteta, te da su izvršila krivično delo Nasilničko ponašanje kao i Nasilničko ponašanje na javnom skupu ili sportskoj priredbi\
                Navedena lica, koja je identifikovalo Više javno tužilaštvo u Beogradu, su: Milija Koldžić, Aleksandar Jokić, Dušan Kostić, Milena Aleksić, Ivan Stanišić',
      isOpen: false
    },
    {
      title: '3. Odbacivanje krivičnih prijava protiv uhapšenih i privedenih studenata na protestima, kao i obustavu već pokrenutih krivičnih postupaka.',
      content: ' U prethodnom periodu predstavnici vlasti su konstatovali da su svi učesnici građanskih protesta pušteni na slobodu. Međutim, to se ne smatra uspunjenjem zahteva. Razlog koji stoji iza toga jeste taj što puštanje na slobodu iz pritvora ne garantuje da ta lica neće biti krivično gonjena, niti da protiv njih neće biti doneta osuđujuća presuda. U skladu s iznetim, zahtevamo da se protiv svih studenata i profesora učesnika građanskih protesta odbace krivične prijave, a ukoliko je krivični postupak u toku, da se isti obustavi.',
      isOpen: false
    },
    {
      title: '4. Povećanje budžeta za visoko obrazovanje u iznosu od 20%',
      content: 'Izdvajanja za visoko obrazovanje predviđena Zakonom o budžetu Republike Srbije za 2025. godinu iznose 84,9 milijardi dinara. Studenti su sa punim pravom tražili povećanje u iznosu od 20% namenjenih sredstava (povećanje za oko 16,98 milijardi dinara odnosno 145,1 miliona evra) – koje bi nivo ulaganja u visoko obrazovanje približilo nivou ulaganja zemalja centralne i istočne Evrope (1,71%, prema metodologiji OECD).1 2 Najavljeno je povećanje „materijalnih troškova“ za 20% - što bi dovelo do povećanja ukupnog budžeta u iznosu od tek 3% (22 miliona evra). „Materijalni troškovi“, dakle, označavaju tek segment budžeta za visoko obrazovanje. Ovako nejasan način predstavljanja povećanja, uz sam po sebi nedovoljan ponuđeni iznos, nije prihvatljiv. Umesto zahtevanog poboljšanja kvaliteta visokog obrazovanja, deo javnosti je doveden u zabludu da je zahtev ispunjen. Dostupnost, pristupačnost i kvalitet visokog obrazovanja su standard progresivnog društva i njegovo finansiranje ne sme biti upitno. Država je dužna da obezbedi uslove u kojima je visoko obrazovanje izbor koji je dostupan svima, uz kvalitet koji je konkurentan na svetskim rang listama univerziteta. Subvencionisanjem ESPB bodova od strane države, značajno bi se olakšali uslovi studiranja na svim nivoima studija, te omogućila veća participacija finansijski ugroženih kategorija društva u visokom obrazovanju. Stoga, ​​predlažemo da subvencionisanje bude izvršeno preko školarina, a na nivou pojedinačnog ESPB boda tako da iznosi 50% cene od one koju bi inače platili studenti. Ograničeni kapaciteti fakulteta za bavljenje naučno-istraživačkim radom sputavaju društvo u pogledu tehnoloških i ekonomskih potencijala, dok nedovoljno finansiranje istraživanja posledično dovodi do devaluacije stručnog kadra i podstiče njegovo iseljavanje iz zemlje. Zahtevamo povećanje sredstava za tehničko i infrastrukturno održavanje fakulteta, kako bi se stvorili kvalitetniji uslovi naučno-istraživačkog rada u zemlji. ',
      isOpen: false
    }
  ];

  // Toggle accordion item
  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }
}
