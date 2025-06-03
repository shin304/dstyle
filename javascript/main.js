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
        // Calculate scroll amount based on card width
        const getCardWidth = () => {
          const card = document.querySelector('.champion-card');
          const cardStyle = window.getComputedStyle(card);
          const cardWidth = parseInt(cardStyle.width);
          const cardMargin = parseInt(cardStyle.marginRight) || 0;
          return cardWidth + cardMargin + 25; // 25はgapサイズ
        };
        
        // Scroll to the left
        prevBtn.addEventListener('click', function() {
          championsContainer.scrollBy({
            left: -getCardWidth(),
            behavior: 'smooth'
          });
        });
        
        // Scroll to the right
        nextBtn.addEventListener('click', function() {
          championsContainer.scrollBy({
            left: getCardWidth(),
            behavior: 'smooth'
          });
        });
        
        // Touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        championsContainer.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
          stopAutoScroll();
        }, false);
        
        championsContainer.addEventListener('touchend', function(e) {
          touchEndX = e.changedTouches[0].screenX;
          handleChampionsSwipe();
          startAutoScroll();
        }, false);
        
        function handleChampionsSwipe() {
          // スワイプの距離がある程度あれば処理（誤タッチ防止）
          if (touchStartX - touchEndX > 70) {
            // 右にスワイプ
            championsContainer.scrollBy({
              left: getCardWidth(),
              behavior: 'smooth'
            });
          } else if (touchEndX - touchStartX > 70) {
            // 左にスワイプ
            championsContainer.scrollBy({
              left: -getCardWidth(),
              behavior: 'smooth'
            });
          }
        }
        
        // Auto scroll functionality
        let autoScrollInterval;
        
        const startAutoScroll = () => {
          // 5秒ごとに自動スクロール
          autoScrollInterval = setInterval(() => {
            // 最大スクロール位置を計算
            const maxScrollLeft = championsContainer.scrollWidth - championsContainer.clientWidth;
            
            // 現在のスクロール位置が最大位置に近い場合、最初に戻る
            if (championsContainer.scrollLeft >= maxScrollLeft - 10) {
              championsContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            } else {
              // 次のカードにスクロール
              championsContainer.scrollBy({
                left: getCardWidth(),
                behavior: 'smooth'
              });
            }
          }, 5000);
        };
        
        const stopAutoScroll = () => {
          clearInterval(autoScrollInterval);
        };
        
        // マウスオーバー時は自動スクロールを停止
        championsContainer.addEventListener('mouseenter', stopAutoScroll);
        championsContainer.addEventListener('mouseleave', startAutoScroll);
        
        // スクロールボタンマウスオーバー時も自動スクロールを停止
        prevBtn.addEventListener('mouseenter', stopAutoScroll);
        prevBtn.addEventListener('mouseleave', startAutoScroll);
        nextBtn.addEventListener('mouseenter', stopAutoScroll);
        nextBtn.addEventListener('mouseleave', startAutoScroll);
        
        // 初期状態で自動スクロールを開始
        startAutoScroll();
      }
    });