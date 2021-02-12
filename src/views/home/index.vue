<template>
  <home-layout>
    <div :class="{'landing-page': true,'show-mobile-menu': showMobileMenu}">
      <div class="mobile-menu" @click="$event.stopPropagation()">
        <a  href="javascript:;" class="logo-mobile">
          <span></span>
        </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a  href="/docs">Developers</a>
          </li>
          <li class="nav-item">
            <a  href="#">Blog</a>
          </li>
          <li class="nav-item">
            <a  href="/faqs">FAQ</a>
          </li>
          <li class="nav-item">
            <a  href="/integrate">Integration</a>
          </li>
          <li class="nav-item">
            <div class="separator"></div>
          </li>
          <li class="nav-item pl-4">
            <i class="fas fa-user-plus"></i>
            <router-link to="/user/register">Register</router-link>
          </li>
          <li class="nav-item pl-4">
            <i class="fas fa-sign-in-alt"></i>
            <router-link to="/user/login">login</router-link>
          </li>
        </ul>
      </div>

      <div class="main-container">
        <div class="landing-page-nav">
          <headroom style="height:initial;">
            <nav>
              <div class="container d-flex align-items-center justify-content-between">
                <a class="navbar-logo pull-left"  href="javascript:;">
                  <span class="white"></span>
                  <span class="dark"></span>
                </a>
                <ul class="navbar-nav d-none d-lg-flex flex-row">
                  <li class="nav-item">
                    <a  href="/docs">Developers</a>
                  </li>
                  <li class="nav-item">
                    <a  href="#">Blog</a>
                  </li>
                  <li class="nav-item">
                    <a  href="/faqs">FAQ</a>
                  </li>
                  <li class="nav-item">
                    <a  href="/integrate">Integration</a>
                  </li>
                  <li class="nav-item pl-4">
                    <i class="fas fa-user-plus"></i>
                    <router-link to="/user/register">Register</router-link>
                  </li>
                  <li class="nav-item pl-4">
                    <i class="fas fa-sign-in-alt"></i>
                    <router-link to="/user/login">login</router-link>
                  </li>
                </ul>
                <span
                  class="mobile-menu-button"
                  @click="showMobileMenu=!showMobileMenu; $event.stopPropagation()"
                >
                  <i class="simple-icon-menu"></i>
                </span>
              </div>
            </nav>
          </headroom>
        </div>

        <div class="content-container" id="home">

          <div class="section home" id="sectionHome">
            <div class="container">

              <div class="row home-row" id="homeRow">
                <div class="col-12 col-md-6 mb-5">
                  <div class="home-text">
                   <div class="d-flex justify-content-center d-md-block">
                      <div>
                        <div class="">
                          <h1 class="d-block py-0 my-0 text-white"><strong> Accept </strong></h1>
                          <h1 class="d-block py-0 my-0"><strong> Bitcoin </strong></h1>
                          <h1 class="d-block py-0 my-0 text-white"><strong> within minutes. </strong></h1>
                        </div>
                        <div class="white mt-5 mb-5">
                          <p> <i class="fas fa-check mr-2"></i> <strong>Fast — </strong>Go live in minutes, not  days</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Free — </strong>  No fees to accept crypto</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Convert — </strong> Sell your crypto for cash or USD Coin</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>USD Coin & DAI — </strong>Accept price-stable cryptocurrency</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Global — </strong> Tap into a global customer base</p>

                          <p> <i class="fas fa-check mr-2" /> <strong>Irreversible — </strong> Chargebacks are a thing of the past</p>

                        </div>
                        <div>
                          <b-form>
                            <b-input-group class="shadow" size="lg">
                              <b-input placeholder="Your email" size="lg" class="py-4" />
                              <b-button type="submit" squared>Get Started</b-button>
                            </b-input-group>
                          </b-form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 mt-5">
                 <div class="row">
                    <div class="col-2 col-md-3"></div>
                    <div class="col-8 col-md-9">
                      <div class="d-flex justify-content-center">
                        <img class="shadow-sm" style="border-radius: 12px" width="280"  alt="payment-anination" src="./../../assets/anipay.gif"/>
                      </div>
                    </div>
                 </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container mb-5" style="margin-top: 100px">
            <div class="mb-5">
              <div class="d-flex justify-content-center">
                  <h1> <strong>Integrated With</strong></h1>
              </div>
              <div class="d-column d-md-flex">
                <div class="flex-fill d-flex justify-content-center mb-4 mb-md-0">
                  <img  src="./../../assets/commerce.svg" />
                </div>
                <div class="flex-fill d-flex justify-content-center">
                  <img src="./../../assets/shop.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>

          <div class="container bg-danger  mt-5" >
            <div class="row">
              <div class="col-12 col-md-2 col-lg-3"></div>

              <div class="col-12 col-md-8 col-lg-6">
                <div class="d-flex justify-content-center">
                  <!-- First image part -->
                  <div>
                    <div class="d-flex justify-content-center">
                      <img class="d-none d-md-block"  src="./../../assets/sit.svg" />
                      <img class="d-block d-md-none" width="250" src="./../../assets/sit.svg" />
                    </div>
                     <div class="mt-5">
                        <h2 class="text-center"><strong>Up and running in minutes</strong></h2>
                        <p class="text-center">
                        We'll have you set up with hosted checkout pages, payment buttons, invoicing, and multiple ecommerce integrations
                        </p>
                      </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-2 col-lg-3">
              </div>
            </div>
          </div>



          <div class="section footer mb-0" id="sectionFooter">
            <div class="container">
              <div class="row footer-row">
                <div class="col-12 text-right">
                  <a
                    class="btn btn-circle btn-outline-semi-light footer-circle-button"

                    href="javascript:;"
                  >
                    <i class="simple-icon-arrow-up"></i>
                  </a>
                </div>
                <div class="col-12 text-center footer-content">
                  <a  href="javascript:;">
                    <img class="footer-logo" alt="footer logo" src="/assets/logos/white-full.svg" />
                  </a>
                </div>
              </div>
            </div>
            <div class="container copyright pt-5 pb-5">
              <div class="row">
                <div class="col-12"></div>
                <div class="col-12 text-center">
                  <p class="mb-0">{{ new Date().getFullYear() }} © African Blockchain </p>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  </home-layout>
</template>

<script>
import { headroom } from "vue-headroom";
import VueScrollTo from "vue-scrollto";
import HomeLayout from "../../layouts/HomeLayout";
import GlideComponent from "../../components/Carousel/GlideComponent";
import { adminRoot, buyUrl } from "../../constants/config";
const slideSettings = {
  type: "carousel",
  gap: 30,
  perView: 4,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    "600": { perView: 1 },
    "992": { perView: 2 },
    "1200": { perView: 3 }
  }
};

const scrollOptions = {
  container: "body",
  easing: "ease-in",
  offset: -120,
  force: true,
  x: false,
  y: true
};

export default {
  components: {
    "home-layout": HomeLayout,
    "glide-component": GlideComponent,
    headroom: headroom
  },
  data() {
    return {
      showMobileMenu: false,
      blocky: true,
      adminRoot,
      buyUrl,
      slideSettings,

    };
  },
  methods: {
    BLOCKY(){
      if(window.innerWidth < 931){
        this.blocky = true;
      }else{
        this.blocky = false;
      }
      console.log(window.innerWidth);
    },

    onWindowResize() {
      const homeRect = document
        .getElementById("homeRow")
        .getBoundingClientRect();
      const homeSection = document.getElementById("sectionHome");
      homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";
      this.BLOCKY();
      const footerSection = document.getElementById("sectionFooter");
      footerSection.style.backgroundPositionX =
        event.target.innerWidth - homeRect.x - 2000 + "px";

      if (event.target.innerWidth >= 992) {
        this.showMobileMenu = false;
      }
    },

    onWindowScroll() {
      this.showMobileMenu = false;
    },
    onWindowClick() {
      this.showMobileMenu = false;
    },

    scrollTo(target) {
      VueScrollTo.scrollTo(target, 200, scrollOptions);
    }
  },
  mounted() {
    document.body.classList.add("no-footer");
    window.addEventListener("scroll", this.onWindowScroll);
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("click", this.onWindowClick);
  },
  beforeDestroy() {
    document.body.classList.remove("no-footer");
    window.removeEventListener("scroll", this.onWindowScroll);
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("click", this.onWindowClick);
  },

  created(){
    this.BLOCKY();
  }
};
</script>
