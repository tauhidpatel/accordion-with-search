import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  displayStyle = "none";
  
  @ViewChild('accordionSearchBar') accordionSearchBar!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeSearch();
  }

  initializeSearch(): void {
    const containsCaseInsensitive = (n: string, m: string) => {
      return n.toUpperCase().includes(m.toUpperCase());
    };

    const accordionSearchBar = this.accordionSearchBar.nativeElement as HTMLInputElement;
    const cardHeaders = document.querySelectorAll('.card-header');

    this.renderer.listen(accordionSearchBar, 'input', () => {
      const searchTerm = accordionSearchBar.value;

      cardHeaders.forEach(header => {
        const headerElement = header as HTMLElement;
        const headerContent = headerElement.textContent || '';
        if (containsCaseInsensitive(headerContent, searchTerm)) {
          headerElement.style.display = 'block';
        } else {
          headerElement.style.display = 'none';
        }
      });

      const panels = document.querySelectorAll('#accordion .accordion-item');
      
      panels.forEach(panel => {
        const panelElement = panel as HTMLElement;
        const panelContent = panelElement.textContent || '';
        if (!containsCaseInsensitive(panelContent, searchTerm)) {
          panelElement.style.display = 'none';
        } else {
          panelElement.style.display = 'block';
        }
      });

      

    });
  }
 
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  ngOnInit(): void { }

}
