import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})

export class FaqComponent {
    faqItems = [
      { question: "Šta je plenum?", answer: "Studentski plenumi su direktno demokratsko-borbene strukture. Kao otvoreni forumi, gde svaki student ima pravo da diskutuje i glasa o pitanjima strategije i taktike studentske socijalne borbe. Odluke plenuma su javne, podložne kritikama i izmenama od strane učesnika plenuma. To plenum čini neuporedivo otpornijim na tajne manevre i malverzacije iza zatvorenih vrata.", isOpen: false },
      { question: "Kako mogu da pomognem?", answer: "Donacijama (link) i izlaženjem na proteste.", isOpen: false },
      { question: "Replika - pitanje - nova reč", answer: "Replika je pravo govora koje sledi nakon izlaganja govornika, a koje se odnosi na izlaganje govornika. Pitanje je pravo govora koje sledi nakon izlaganja govornika, a koje se odnosi na izlaganje govornika. Tehnička replika je pravo govora koje sledi nakon izlaganja govornika, a koje se odnosi na izlaganje govornika. Nova reč je pravo govora koje sledi nakon izlaganja govornika, a koje se odnosi na izlaganje govornika.", isOpen: false },
      { question: "Ko može da učestvuje u plenumu?", answer: "Svi studenti i studentkinje koji su zainteresovani za borbu za svoja prava.", isOpen: false },
      { question: "Kako se donacije koriste?", answer: "Donacije se koriste za pokrivanje troškova protesta, štampanje letaka, organizaciju tribina i drugih događaja.", isOpen: false },
      { question: "Šta su radne grupe?", answer: "Radne grupe su grupe studenata i studentkinja koje se bave određenim temama i zadacima. Radne grupe su otvorene za sve zainteresovane studente i studentkinje.", isOpen: false },
      { question: "Kako mogu da se uključim u radne grupe?", answer: "Možeš da se uključiš u radne grupe tako što ćeš posetiti neki od plenuma i izraziti svoju želju da se uključiš u radnu grupu koja te zanima.", isOpen: false },
      { question: "Koje su radne grupe?", answer: "Trenutno postoje radne grupe za odnose sa javnošću, agitaciju i motivaciju, dnevni red, logistiku, bezbednost kao i deveops.", isOpen: false },
  ];

  toggleItem(index: number): void {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
