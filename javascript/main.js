    // ハンバーガーメニュー
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // メニューの背景要素を作成
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      menuBackdrop.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // 背景クリックでメニューを閉じる
    menuBackdrop.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      menuBackdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    
    // スクロール時のヘッダー変更とアクティブメニュー管理
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      const scrollTop = document.getElementById('scrollTop');
      
      // ヘッダースタイルの切り替え（スムーズに）
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
      
      if (window.scrollY > 500) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
      
      // スクロール位置に基づいてナビゲーションメニュー項目をアクティブにする
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + header.offsetHeight + 10;
      
      sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const navItem = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navItem && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-menu a').forEach(item => {
            item.classList.remove('active');
          });
          navItem.classList.add('active');
        }
      });
    });
    
    // スクロールトップボタン
    document.getElementById('scrollTop').addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // スムーススクロール強化
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // ハンバーガーメニューが開いている場合は閉じる
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          menuBackdrop.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        // アクティブクラスを更新
        document.querySelectorAll('.nav-menu a').forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');
        
        // ヘッダーの高さを考慮した位置にスクロール
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
    
    // メニュー項目にアニメーション効果を追加
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    navMenuItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // ヘッダーのロゴにホバーエフェクト追加
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', function() {
        const logoIcon = this.querySelector('.logo-icon');
        if (logoIcon) {
          logoIcon.style.transform = 'rotate(10deg)';
          setTimeout(() => {
            logoIcon.style.transform = '';
          }, 500);
        }
      });
    }
    
    // アコーディオン
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
      const header = accordion.querySelector('.accordion-header');
      const content = accordion.querySelector('.accordion-content');
      
      header.addEventListener('click', function() {
        accordion.classList.toggle('active');
        
        if (accordion.classList.contains('active')) {
          // アクティブなアコーディオン以外を閉じる
          accordions.forEach(item => {
            if (item !== accordion && item.classList.contains('active')) {
              item.classList.remove('active');
            }
          });
        }
      });
    });

    // イベント一覧横スクロール
    document.addEventListener('DOMContentLoaded', function() {
      const scrollLeftBtn = document.querySelector('.scroll-left');
      const scrollRightBtn = document.querySelector('.scroll-right');
      const scrollWrapper = document.querySelector('.event-scroll-wrapper');
      
      if (scrollLeftBtn && scrollRightBtn && scrollWrapper) {
        // スクロール量を設定（カードの幅 + ギャップ）
        const scrollAmount = 340;
        
        // 右にスクロール
        scrollRightBtn.addEventListener('click', function() {
          scrollWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        });
        
        // 左にスクロール
        scrollLeftBtn.addEventListener('click', function() {
          scrollWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        });
        
        // スクロール位置によってボタンの表示/非表示を切り替え
        scrollWrapper.addEventListener('scroll', function() {
          // スクロールの最大位置
          const maxScrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
          
          // 左端にいる場合、左ボタンを非表示
          if (scrollWrapper.scrollLeft <= 10) {
            scrollLeftBtn.style.opacity = '0.5';
            scrollLeftBtn.style.pointerEvents = 'none';
          } else {
            scrollLeftBtn.style.opacity = '0.9';
            scrollLeftBtn.style.pointerEvents = 'auto';
          }
          
          // 右端にいる場合、右ボタンを非表示
          if (scrollWrapper.scrollLeft >= maxScrollLeft - 10) {
            scrollRightBtn.style.opacity = '0.5';
            scrollRightBtn.style.pointerEvents = 'none';
          } else {
            scrollRightBtn.style.opacity = '0.9';
            scrollRightBtn.style.pointerEvents = 'auto';
          }
        });
        
        // 初期状態で左ボタンを非表示
        scrollLeftBtn.style.opacity = '0.5';
        scrollLeftBtn.style.pointerEvents = 'none';
        
        // タッチデバイス用のスクロール処理
        let touchStartX = 0;
        let touchEndX = 0;
        
        scrollWrapper.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        scrollWrapper.addEventListener('touchend', function(e) {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, false);
        
        function handleSwipe() {
          // スワイプの距離がある程度あれば処理（誤タッチ防止）
          if (touchStartX - touchEndX > 70) {
            // 右にスワイプ
            scrollWrapper.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          } else if (touchEndX - touchStartX > 70) {
            // 左にスワイプ
            scrollWrapper.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
            });
          }
        }
      }
      
      // Champions Section Horizontal Scroll
      const championsContainer = document.querySelector('.champions-container');
      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      
      if (championsContainer && prevBtn && nextBtn) {
        console.log('Champions scroll system initialized');
        
        // カードの基本情報
        const cardWidth = 330;
        const gap = 30;
        const cardStep = cardWidth + gap; // 360px
        
        // 総カード数を取得
        const getTotalCards = () => {
          const cards = document.querySelectorAll('.champion-card');
          return cards.length;
        };
        
        // より正確な現在のカードインデックスを取得
        const getCurrentCardIndex = () => {
          const scrollLeft = championsContainer.scrollLeft;
          const containerWidth = championsContainer.clientWidth;
          const maxScroll = championsContainer.scrollWidth - containerWidth;
          const totalCards = getTotalCards();
          
          // 最大スクロール位置の場合は最後のカード
          if (scrollLeft >= maxScroll - 10) {
            console.log(`At max scroll (${scrollLeft}/${maxScroll}), returning last card index: ${totalCards - 1}`);
            return totalCards - 1;
          }
          
          // 通常の計算
          const rawIndex = scrollLeft / cardStep;
          const index = Math.round(rawIndex);
          const clampedIndex = Math.max(0, Math.min(index, totalCards - 1));
          
          console.log(`Scroll: ${scrollLeft}, Raw index: ${rawIndex}, Rounded: ${index}, Final: ${clampedIndex}`);
          return clampedIndex;
        };
        
        // 強制的に指定したカードにスクロール
        const forceScrollToCard = (index) => {
          const totalCards = getTotalCards();
          const validIndex = Math.max(0, Math.min(index, totalCards - 1));
          
          console.log(`Force scrolling to card ${validIndex}/${totalCards - 1}`);
          
          if (validIndex === totalCards - 1) {
            // 最後のカードの場合
            const maxScroll = championsContainer.scrollWidth - championsContainer.clientWidth;
            console.log(`Using max scroll position: ${maxScroll}`);
            championsContainer.scrollLeft = maxScroll;
          } else {
            // 通常のカードの場合
            const targetPosition = validIndex * cardStep;
            console.log(`Using calculated position: ${targetPosition}`);
            championsContainer.scrollLeft = targetPosition;
          }
          
          // 念のためsmooth scrollも実行
          setTimeout(() => {
            if (validIndex === totalCards - 1) {
              const maxScroll = championsContainer.scrollWidth - championsContainer.clientWidth;
              championsContainer.scrollTo({
                left: maxScroll,
                behavior: 'smooth'
              });
            } else {
              championsContainer.scrollTo({
                left: validIndex * cardStep,
                behavior: 'smooth'
              });
            }
          }, 50);
        };
        
        // 前のカードへ
        prevBtn.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('=== PREVIOUS BUTTON CLICKED ===');
          
          const currentIndex = getCurrentCardIndex();
          console.log(`Current index: ${currentIndex}`);
          
          if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            console.log(`Moving to previous card: ${currentIndex} -> ${newIndex}`);
            forceScrollToCard(newIndex);
          } else {
            console.log(`Already at first card (${currentIndex}), cannot go back`);
          }
          
          console.log('=== END PREVIOUS CLICK ===');
        });
        
        // 次のカードへ
        nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('=== NEXT BUTTON CLICKED ===');
          
          const currentIndex = getCurrentCardIndex();
          const totalCards = getTotalCards();
          console.log(`Current index: ${currentIndex}, Total cards: ${totalCards}`);
          
          if (currentIndex < totalCards - 1) {
            const newIndex = currentIndex + 1;
            console.log(`Moving to next card: ${currentIndex} -> ${newIndex}`);
            forceScrollToCard(newIndex);
          } else {
            console.log(`Already at last card (${currentIndex}), cannot go forward`);
          }
          
          console.log('=== END NEXT CLICK ===');
        });
        
        // タッチスワイプ機能
        let touchStartX = 0;
        let touchEndX = 0;
        
        championsContainer.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        championsContainer.addEventListener('touchend', function(e) {
          touchEndX = e.changedTouches[0].screenX;
          const swipeDistance = touchStartX - touchEndX;
          
          if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
              // 右にスワイプ（次のカードへ）
              const currentIndex = getCurrentCardIndex();
              const totalCards = getTotalCards();
              if (currentIndex < totalCards - 1) {
                forceScrollToCard(currentIndex + 1);
              }
            } else {
              // 左にスワイプ（前のカードへ）
              const currentIndex = getCurrentCardIndex();
              if (currentIndex > 0) {
                forceScrollToCard(currentIndex - 1);
              }
            }
          }
        }, false);
        
        // ウィンドウリサイズ時の調整
        window.addEventListener('resize', function() {
          const currentIndex = getCurrentCardIndex();
          setTimeout(() => {
            forceScrollToCard(currentIndex);
          }, 100);
        });
        
        // 初期位置設定とデバッグ情報
        setTimeout(() => {
          const totalCards = getTotalCards();
          const containerWidth = championsContainer.clientWidth;
          const scrollWidth = championsContainer.scrollWidth;
          
          console.log(`=== Champions Debug Info ===`);
          console.log(`Total cards: ${totalCards}`);
          console.log(`Container width: ${containerWidth}`);
          console.log(`Scroll width: ${scrollWidth}`);
          console.log(`Max scroll: ${scrollWidth - containerWidth}`);
          console.log(`Card step: ${cardStep}`);
          console.log(`Cards per step: ${scrollWidth / cardStep}`);
          console.log(`============================`);
          
          forceScrollToCard(0);
        }, 100);
        
        // デバッグ用：現在の状態を表示
        window.debugChampions = () => {
          const currentIndex = getCurrentCardIndex();
          const scrollLeft = championsContainer.scrollLeft;
          const maxScroll = championsContainer.scrollWidth - championsContainer.clientWidth;
          
          console.log(`=== Current State ===`);
          console.log(`Current index: ${currentIndex}`);
          console.log(`Scroll position: ${scrollLeft}`);
          console.log(`Max scroll: ${maxScroll}`);
          console.log(`==================`);
        };
      }
    });