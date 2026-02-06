import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/python/python基础/1">
            开启学习之旅 ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6', styles.contactInfo)}>
            <Heading as="h2">加入学习社群</Heading>
            <p className={styles.contactDesc}>
              扫描二维码添加我的微信，加入软件测试学习交流群，与更多测试工程师一起进步！
            </p>
            <ul className={styles.benefitsList}>
              <li>🎯 获取最新教程更新通知</li>
              <li>💬 与同行交流测试技术</li>
              <li>📚 分享测试资料与工具</li>
              <li>🚀 获得一对一学习指导</li>
            </ul>
            <div className={styles.socialLinks}>
              <Link
                className="button button--primary"
                href="https://github.com/Tester-1991">
                GitHub
              </Link>
              <Link
                className="button button--info"
                to="/docs/python/python基础/1">
                浏览文档
              </Link>
            </div>
          </div>
          <div className={clsx('col col--6', styles.qrCodeSection)}>
            <div className={styles.qrCodeCard}>
              <img
                src={require('@site/static/img/wechat-qr.png').default}
                alt="微信二维码"
                className={styles.qrCode}
              />
              <p className={styles.qrCodeText}>扫码添加微信，备注「测试学习」</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={clsx('text--center', styles.aboutContent)}>
          <Heading as="h2">关于博主</Heading>
          <p className={styles.aboutText}>
            我是一名资深软件测试工程师，拥有多年的自动化测试和测试开发经验。
            在这里，我会分享我在测试领域的实战经验、技术心得和学习方法，
            帮助你从零基础成长为优秀的测试开发工程师。
          </p>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>原创教程</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>学习粉丝</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>8年+</span>
              <span className={styles.statLabel}>测试经验</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="专注于自动化测试、测试开发、AI测试的教程分享网站">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AboutSection />
        <ContactSection />
      </main>
    </Layout>
  );
}
