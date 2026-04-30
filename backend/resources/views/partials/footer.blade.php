<!-- Footer -->
<footer class="footer-area pt-100">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <div class="footer-item">
                    <div class="footer-logo">
                        <a class="logo" href="{{ route('home') }}">
                            <img src="{{ asset('assets/img/logo-two.png') }}" alt="Logo">
                        </a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vero, magni est placeat neque, repellat maxime a dolore</p>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/" target="_blank">
                                    <i class="icofont-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/" target="_blank">
                                    <i class="icofont-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="_blank">
                                    <i class="icofont-youtube-play"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" target="_blank">
                                    <i class="icofont-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="footer-item">
                    <div class="footer-causes">
                        <h3>Urgent causes</h3>
                        <div class="cause-inner">
                            <ul class="align-items-center">
                                <li>
                                    <img src="{{ asset('assets/img/footer-thumb1.jpg') }}" alt="Cause">
                                </li>
                                <li>
                                    <h3>
                                        <a href="{{ route('donations.show', 1) }}">Donate for melina the little child</a>
                                    </h3>
                                </li>
                            </ul>
                        </div>
                        <div class="cause-inner">
                            <ul class="align-items-center">
                                <li>
                                    <img src="{{ asset('assets/img/footer-thumb2.jpg') }}" alt="Cause">
                                </li>
                                <li>
                                    <h3>
                                        <a href="{{ route('donations.show', 2) }}">Relief for Australia cyclone effected</a>
                                    </h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="footer-item">
                    <div class="footer-links">
                        <h3>Quick links</h3>
                        <ul>
                            <li>
                                <a href="{{ route('about') }}">
                                    <i class="icofont-simple-right"></i>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('blog.index') }}">
                                    <i class="icofont-simple-right"></i>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('events.index') }}">
                                    <i class="icofont-simple-right"></i>
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('donations.index') }}">
                                    <i class="icofont-simple-right"></i>
                                    Donation
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="footer-item">
                    <div class="footer-contact">
                        <h3>Contact info</h3>
                        <div class="contact-inner">
                            <ul>
                                <li>
                                    <i class="icofont-location-pin"></i>
                                    <a href="#">6B, Helvetica street, Jordan</a>
                                </li>
                                <li>
                                    <i class="icofont-ui-call"></i>
                                    <a href="tel:123456789">+123-456-789</a>
                                </li>
                            </ul>
                        </div>
                        <div class="contact-inner">
                            <ul>
                                <li>
                                    <i class="icofont-location-pin"></i>
                                    <a href="#">6A, New street, Spain</a>
                                </li>
                                <li>
                                    <i class="icofont-ui-call"></i>
                                    <a href="tel:548658956">+548-658-956</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-area">
            <p>Copyright @{{ date('Y') }} Findo. Designed By <a href="https://hibootstrap.com/" target="_blank">HiBootstrap</a></p>
        </div>
    </div>
</footer>
<!-- End Footer -->