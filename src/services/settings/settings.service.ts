// settings.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private selectedCategorySubject = new BehaviorSubject<string>(this.getSavedCategory() || 'business');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCategory(value: string) {
    this.selectedCategorySubject.next(value);
    this.saveCategory(value);
  }

  private saveCategory(category: string) {
    localStorage.setItem('selectedCategory', category);
  }

  private getSavedCategory(): string | null {
    return localStorage.getItem('selectedCategory');
  }
}
